<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use App\Models\Article;

class ScrapeBeyondChats extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape the 5 oldest articles from BeyondChats blog';

    public function handle()
    {
        $this->info('🚀 Starting BeyondChats scraping...');
        libxml_use_internal_errors(true);

        // 1️⃣ Fetch blog index
        $response = Http::get('https://beyondchats.com/blogs/');
        if (!$response->successful()) {
            $this->error('❌ Failed to fetch blog index');
            return Command::FAILURE;
        }

        $dom = new \DOMDocument();
        $dom->loadHTML($response->body());
        $xpath = new \DOMXPath($dom);

        // 2️⃣ Find LAST page number
        $pages = $xpath->query("//a[contains(@class,'page-numbers')]");
        $lastPage = 1;

        foreach ($pages as $page) {
            $num = trim($page->textContent);
            if (is_numeric($num)) {
                $lastPage = (int) $num;
            }
        }

        $this->info("📄 Last page number detected: $lastPage");

        // 3️⃣ Collect 5 OLDEST article links (across pages)
        $articleLinks = [];

        for ($page = $lastPage; $page >= 1 && count($articleLinks) < 5; $page--) {

            $pageUrl = "https://beyondchats.com/blogs/page/$page/";
            $this->info("🔍 Scanning: $pageUrl");

            $pageResponse = Http::get($pageUrl);
            if (!$pageResponse->successful()) {
                continue;
            }

            $dom->loadHTML($pageResponse->body());
            $xpath = new \DOMXPath($dom);

            $nodes = $xpath->query("//h2/a");

            foreach ($nodes as $node) {
                $link = $node->getAttribute('href');
                if (!in_array($link, $articleLinks)) {
                    $articleLinks[] = $link;
                }
            }
        }

        $articleLinks = array_slice($articleLinks, 0, 5);
        $this->info('🔗 Total articles collected: ' . count($articleLinks));

        // 4️⃣ Scrape each article
        foreach ($articleLinks as $url) {

            if (Article::where('source_url', $url)->exists()) {
                $this->warn("⚠️ Already exists: $url");
                continue;
            }

            $articleResponse = Http::get($url);
            if (!$articleResponse->successful()) {
                $this->warn("⚠️ Failed to fetch: $url");
                continue;
            }

            $dom->loadHTML($articleResponse->body());
            $xpath = new \DOMXPath($dom);

            // Title
            $titleNode = $xpath->query("//h1")->item(0);
            if (!$titleNode) {
                $this->warn("⚠️ Title missing: $url");
                continue;
            }

            $title = trim($titleNode->textContent);

            // 🔥 BULLETPROOF CONTENT EXTRACTION
            $container =
                $xpath->query("//article")->item(0)
                ?? $xpath->query("//main")->item(0)
                ?? $xpath->query("//body")->item(0);

            if (!$container) {
                $this->warn("⚠️ Content container missing: $url");
                continue;
            }

            $content = trim(preg_replace('/\s+/', ' ', $container->textContent));

            if (strlen($content) < 200) {
                $this->warn("⚠️ Content too short: $url");
                continue;
            }

            Article::create([
                'title' => $title,
                'slug' => Str::slug($title) . '-' . uniqid(),
                'content' => $content,
                'source_url' => $url,
            ]);

            $this->info("✅ Saved: $title");
        }

        $this->info('🎉 Scraping finished successfully!');
        return Command::SUCCESS;
    }
}
