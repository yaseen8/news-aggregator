<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class ScrapeNewsData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape news data from multiple sources and store it locally';

    /**
     * Execute the console command.
     */
    public function handle()
    {
         // Fetch data from NewsAPI
         $newsApiData = $this->fetchDataFromNewsAPI();

         // Fetch data from gurdian api
         $guardianData = $this->fetchDataFromGuardianAPI();
 
         // Store data in the local database
         $this->storeDataLocally($newsApiData, $guardianData);
 
         $this->info('News data scraped and stored successfully!');
    }

    private function fetchDataFromNewsAPI()
    {
        // Make HTTP request to NewsAPI and get the response
        $response = Http::get(config('app.news_api_url'));

        return $response->json();
    }

    private function fetchDataFromGuardianAPI()
    {
        // Make HTTP request to Guardian and get the response
        $response = Http::get(config('app.guardian_api_url'));

        return $response->json();
    }

    private function storeDataLocally($newsApiData, $guardianData)
    {
        // Store data in the local database
        // You can customize this based on your database schema
        foreach($newsApiData['articles'] as $newapi) {
            DB::table('articles')->insert([
                'source' => 'newsapi',
                'title' => $newapi['title'],
                'description' => $newapi['description'],
                'publishedAt' => $newapi['publishedAt'],
                'urlToImage' => $newapi['urlToImage'] ? $newapi['urlToImage'] : "https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
            ]);
        }

        foreach($guardianData['response']['results'] as $guardian) {
            DB::table('articles')->insert([
                'source' => 'guardianapi',
                'title' => $guardian['webTitle'],
                'description' => $guardian['webTitle'],
                'publishedAt' => $guardian['webPublicationDate'],
                'urlToImage' => "https://media.wired.com/photos/65668f0cb38d7a2373721a48/191:100/w_1280,c_limit/Crpyto-Can't-Help-Itself-Business-1400047284.jpg"
            ]);
        }
    }
}
