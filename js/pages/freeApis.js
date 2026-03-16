const FreeApisPage = {
    apis: [
        { name: 'JSONPlaceholder', desc: 'Free fake REST API for testing and prototyping. Provides posts, comments, users, and more.', url: 'https://jsonplaceholder.typicode.com', category: 'Testing', auth: 'None', cors: true },
        { name: 'OpenWeatherMap', desc: 'Current weather data, forecasts, and historical data for any location worldwide.', url: 'https://openweathermap.org/api', category: 'Weather', auth: 'API Key', cors: true },
        { name: 'REST Countries', desc: 'Get information about countries including population, languages, currencies, and flags.', url: 'https://restcountries.com', category: 'Data', auth: 'None', cors: true },
        { name: 'PokeAPI', desc: 'All the Pokémon data you will ever need in one place. RESTful API for Pokémon data.', url: 'https://pokeapi.co', category: 'Entertainment', auth: 'None', cors: true },
        { name: 'The Dog API', desc: 'A free API to get random dog images, breeds info, and sub-breed information.', url: 'https://thedogapi.com', category: 'Animals', auth: 'API Key', cors: true },
        { name: 'The Cat API', desc: 'Random cat images, breeds info, and categories. Perfect for cat lovers.', url: 'https://thecatapi.com', category: 'Animals', auth: 'API Key', cors: true },
        { name: 'NewsAPI', desc: 'Search worldwide news articles and headlines from over 80,000 sources.', url: 'https://newsapi.org', category: 'News', auth: 'API Key', cors: false },
        { name: 'Random User', desc: 'Generate random user data including names, emails, photos and more for testing.', url: 'https://randomuser.me', category: 'Testing', auth: 'None', cors: true },
        { name: 'Unsplash', desc: 'Beautiful, free images and photos from the world largest open collection.', url: 'https://unsplash.com/developers', category: 'Photos', auth: 'OAuth', cors: true },
        { name: 'Quotable', desc: 'Free API for famous quotes. Get random quotes, search by author or tags.', url: 'https://github.com/lukePeavey/quotable', category: 'Data', auth: 'None', cors: true },
        { name: 'CoinGecko', desc: 'Comprehensive cryptocurrency data including prices, market cap, and exchange info.', url: 'https://www.coingecko.com/api', category: 'Finance', auth: 'None', cors: true },
        { name: 'NASA APIs', desc: 'Access to NASA data including astronomy picture of the day, Mars rover photos, and more.', url: 'https://api.nasa.gov', category: 'Science', auth: 'API Key', cors: true },
        { name: 'GitHub API', desc: 'Access GitHub data including repos, users, organizations, issues, and pull requests.', url: 'https://docs.github.com/en/rest', category: 'Development', auth: 'OAuth', cors: true },
        { name: 'Open Library', desc: 'Access millions of book records with covers, descriptions, and metadata.', url: 'https://openlibrary.org/developers/api', category: 'Books', auth: 'None', cors: true },
        { name: 'TMDB', desc: 'The Movie Database API for movies, TV shows, actors, and images.', url: 'https://developers.themoviedb.org', category: 'Entertainment', auth: 'API Key', cors: true },
        { name: 'Spotify Web API', desc: 'Access Spotify music catalog, playlists, user data, and playback controls.', url: 'https://developer.spotify.com/documentation/web-api', category: 'Music', auth: 'OAuth', cors: true },
        { name: 'ExchangeRate-API', desc: 'Free currency exchange rate API with support for 160+ currencies.', url: 'https://www.exchangerate-api.com', category: 'Finance', auth: 'API Key', cors: true },
        { name: 'IP API', desc: 'IP geolocation API. Get country, city, timezone, and ISP info from an IP address.', url: 'https://ipapi.co', category: 'Data', auth: 'None', cors: true },
        { name: 'JokeAPI', desc: 'Get programming, dark, pun, or miscellaneous jokes in various formats.', url: 'https://jokeapi.dev', category: 'Entertainment', auth: 'None', cors: true },
        { name: 'Agify.io', desc: 'Predict the age of a person based on their name using statistical analysis.', url: 'https://agify.io', category: 'Data', auth: 'None', cors: true },
        { name: 'DummyJSON', desc: 'Fake REST API with 150+ products, carts, users, posts, and more for frontend testing.', url: 'https://dummyjson.com', category: 'Testing', auth: 'None', cors: true },
        { name: 'Public APIs', desc: 'A collective list of free APIs for use in software and web development.', url: 'https://api.publicapis.org', category: 'Development', auth: 'None', cors: true },
        { name: 'Cloudflare Workers AI', desc: 'Run serverless AI inference on various models including text, image, and translation.', url: 'https://developers.cloudflare.com/workers-ai', category: 'AI/ML', auth: 'API Key', cors: true },
        { name: 'Hugging Face', desc: 'Access thousands of ML models for NLP, vision, audio and more via inference API.', url: 'https://huggingface.co/docs/api-inference', category: 'AI/ML', auth: 'API Key', cors: true },
        { name: 'Mapbox', desc: 'Maps, geocoding, navigation, and location search APIs for web and mobile.', url: 'https://docs.mapbox.com/api', category: 'Maps', auth: 'API Key', cors: true },
        { name: 'Firebase', desc: 'Google backend-as-a-service with auth, database, storage, hosting and functions.', url: 'https://firebase.google.com/docs/reference/rest', category: 'Development', auth: 'API Key', cors: true },
        { name: 'Twilio', desc: 'Cloud communications platform for SMS, voice, video, and email APIs.', url: 'https://www.twilio.com/docs/usage/api', category: 'Communication', auth: 'API Key', cors: false },
        { name: 'SendGrid', desc: 'Cloud-based email delivery service for transactional and marketing emails.', url: 'https://docs.sendgrid.com/api-reference', category: 'Communication', auth: 'API Key', cors: false },
        { name: 'Stripe', desc: 'Payment processing API for online businesses. Cards, subscriptions, and invoices.', url: 'https://stripe.com/docs/api', category: 'Finance', auth: 'API Key', cors: false },
        { name: 'Giphy', desc: 'Search and share GIFs. Access millions of animated GIFs, stickers, and clips.', url: 'https://developers.giphy.com', category: 'Entertainment', auth: 'API Key', cors: true },
        { name: 'Pexels', desc: 'Free stock photos and videos. Search, curated collections, and popular content.', url: 'https://www.pexels.com/api', category: 'Photos', auth: 'API Key', cors: true },
        { name: 'Abstract API', desc: 'Suite of APIs for email validation, IP geolocation, VAT, and holiday data.', url: 'https://www.abstractapi.com', category: 'Data', auth: 'API Key', cors: true },
        { name: 'Notion API', desc: 'Integrate with Notion workspaces to read and write pages, databases, and blocks.', url: 'https://developers.notion.com', category: 'Productivity', auth: 'OAuth', cors: false },
        { name: 'Discord API', desc: 'Build bots and integrations for Discord servers with messaging and voice APIs.', url: 'https://discord.com/developers/docs', category: 'Communication', auth: 'OAuth', cors: false },
        { name: 'Vercel API', desc: 'Manage deployments, domains, secrets, and projects on the Vercel platform.', url: 'https://vercel.com/docs/rest-api', category: 'Development', auth: 'API Key', cors: true },
        { name: 'OpenAI API', desc: 'Access GPT models for text generation, embeddings, image generation, and more.', url: 'https://platform.openai.com/docs/api-reference', category: 'AI/ML', auth: 'API Key', cors: false },
        { name: 'Gemini API', desc: 'Google multimodal AI model API for text, image, and code generation tasks.', url: 'https://ai.google.dev/docs', category: 'AI/ML', auth: 'API Key', cors: true },
        { name: 'Anthropic API', desc: 'Access Claude models for safe, helpful AI assistance and text generation.', url: 'https://docs.anthropic.com/en/docs', category: 'AI/ML', auth: 'API Key', cors: false },
        { name: 'RapidAPI', desc: 'API marketplace with thousands of APIs across categories. Single key for all.', url: 'https://rapidapi.com', category: 'Development', auth: 'API Key', cors: true },
        { name: 'Alpha Vantage', desc: 'Free APIs for realtime and historical stock market data, forex, and crypto.', url: 'https://www.alphavantage.co', category: 'Finance', auth: 'API Key', cors: true },
        { name: 'World Bank API', desc: 'Access World Bank data on development indicators, countries, and topics.', url: 'https://datahelpdesk.worldbank.org/knowledgebase/articles/889392', category: 'Data', auth: 'None', cors: true },
        { name: 'Pixabay', desc: 'Free images and video clips. Over 2.6 million royalty free stock media.', url: 'https://pixabay.com/api/docs', category: 'Photos', auth: 'API Key', cors: true },
        { name: 'Wikipedia API', desc: 'Access Wikipedia content, search articles, and get page summaries programmatically.', url: 'https://www.mediawiki.org/wiki/API:Main_page', category: 'Data', auth: 'None', cors: true },
        { name: 'Google Fonts API', desc: 'Access the entire Google Fonts library metadata and serve web fonts dynamically.', url: 'https://developers.google.com/fonts', category: 'Development', auth: 'API Key', cors: true },
        { name: 'Recharts Data', desc: 'Generate mock chart data for testing visualization libraries and dashboards.', url: 'https://dummyjson.com', category: 'Testing', auth: 'None', cors: true },
        { name: 'Bored API', desc: 'Let\'s find you something to do. Suggests random activities.', url: 'https://www.boredapi.com', category: 'Entertainment', auth: 'None', cors: true },
        { name: 'Cat Facts API', desc: 'Daily cat facts for your applications and scripts.', url: 'https://catfact.ninja', category: 'Animals', auth: 'None', cors: true },
        { name: 'Dog Facts API', desc: 'Get random facts about dogs.', url: 'https://dog-api.kinduff.com', category: 'Animals', auth: 'None', cors: true },
        { name: 'Open Trivia DB', desc: 'Free to use, user-contributed trivia question database.', url: 'https://opentdb.com', category: 'Entertainment', auth: 'None', cors: true },
        { name: 'ReqRes', desc: 'A hosted REST-API ready to respond to your AJAX requests.', url: 'https://reqres.in', category: 'Testing', auth: 'None', cors: true },
        { name: 'JSONBin', desc: 'Free JSON storage service ideal for small web apps.', url: 'https://jsonbin.io', category: 'Development', auth: 'API Key', cors: true },
        { name: 'Numbers API', desc: 'An API for interesting facts about numbers.', url: 'http://numbersapi.com', category: 'Data', auth: 'None', cors: true },
        { name: 'CryptoCompare', desc: 'Streaming pricing data, historic data, and news for cryptocurrencies.', url: 'https://min-api.cryptocompare.com', category: 'Finance', auth: 'API Key', cors: true },
        { name: 'Dad Jokes API', desc: 'Free API to get dad jokes in various formats (JSON, text, HTML).', url: 'https://icanhazdadjoke.com/api', category: 'Entertainment', auth: 'None', cors: true },
        { name: 'Frankfurter', desc: 'Open-source API for current and historical foreign exchange rates published by the European Central Bank.', url: 'https://www.frankfurter.app', category: 'Finance', auth: 'None', cors: true }
    ],

    categories: [],
    activeCategory: 'All',
    searchQuery: '',

    render() {
        Navbar.renderTopbar('Free APIs');
        this.categories = ['All', ...new Set(this.apis.map(a => a.category))].sort();
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Free <span class="text-gradient">APIs</span></h1>
                    <p>A curated directory of free public APIs organized by category for your projects.</p>
                </div>
                <div class="flex-between mb-lg flex-wrap gap-md">
                    <div class="search-container" style="min-width: 280px; flex: 1; max-width: 400px;">
                        <i class="fa-solid fa-magnifying-glass search-icon"></i>
                        <input class="input-field" id="api-search" type="text" placeholder="Search APIs..." />
                    </div>
                    <div class="flex-gap" style="font-size: 0.82rem; color: var(--text-muted);">
                        <i class="fa-solid fa-database"></i>
                        <span>${this.apis.length} APIs available</span>
                    </div>
                </div>
                <div class="tabs mb-lg" id="api-category-tabs" style="overflow-x: auto;"></div>
                <div class="grid-3" id="api-grid"></div>
            </div>`;

        this.renderCategoryTabs();
        this.renderApiGrid();
        this.bindEvents();
    },

    renderCategoryTabs() {
        const tabs = document.getElementById('api-category-tabs');
        tabs.innerHTML = this.categories.map(cat =>
            `<button class="tab-item ${cat === this.activeCategory ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
        ).join('');
    },

    renderApiGrid() {
        const grid = document.getElementById('api-grid');
        let filtered = this.apis;

        if (this.activeCategory !== 'All') {
            filtered = filtered.filter(a => a.category === this.activeCategory);
        }
        if (this.searchQuery) {
            const q = this.searchQuery.toLowerCase();
            filtered = filtered.filter(a =>
                a.name.toLowerCase().includes(q) ||
                a.desc.toLowerCase().includes(q) ||
                a.category.toLowerCase().includes(q)
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><i class="fa-solid fa-search"></i><h3>No APIs found</h3><p>Try adjusting your search or category filter.</p></div>`;
            return;
        }

        const authColors = { 'None': 'tag-success', 'API Key': 'tag-warning', 'OAuth': 'tag-accent' };

        grid.innerHTML = filtered.map(api => `
            <div class="glass-card api-card">
                <div class="api-header">
                    <h3>${api.name}</h3>
                    <span class="tag ${authColors[api.auth] || 'tag-primary'}">${api.auth}</span>
                </div>
                <p class="api-desc">${api.desc}</p>
                <div class="api-tags">
                    <span class="tag tag-primary">${api.category}</span>
                    ${api.cors ? '<span class="tag tag-success">CORS</span>' : '<span class="tag tag-error">No CORS</span>'}
                </div>
                <a href="${api.url}" target="_blank" rel="noopener" class="api-link">
                    Visit API Docs <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>`).join('');
    },

    bindEvents() {
        document.getElementById('api-category-tabs').addEventListener('click', (e) => {
            if (!e.target.classList.contains('tab-item')) return;
            this.activeCategory = e.target.dataset.cat;
            document.querySelectorAll('#api-category-tabs .tab-item').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            this.renderApiGrid();
        });

        document.getElementById('api-search').addEventListener('input', Helpers.debounce((e) => {
            this.searchQuery = e.target.value;
            this.renderApiGrid();
        }, 200));
    }
};
