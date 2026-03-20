const DocsPage = {
    docSuggestions: [
        "Python List Comprehensions", "React useEffect Hook", "Docker Compose Basics",
        "Rust Ownership Model", "Git Rebase vs Merge", "SQL JOIN Types",
        "Java Streams", "C++ Smart Pointers", "CSS Grid Layout", "Node.js Event Loop",
        "Go Goroutines", "MongoDB Aggregation", "Bash Scripting Basics",
        "JavaScript Promises", "TypeScript Generics", "REST API Design",
        "GraphQL Queries", "Kubernetes Pods", "Redis Caching", "WebSocket Protocol"
    ],

    quickDocs: {
        'python list comprehension': [
            { title: 'List Comprehension — Python', tags: ['Python', 'Syntax'], summary: 'List comprehension provides a concise way to create lists in Python.\n\nSyntax:\n  [expression for item in iterable if condition]\n\nExamples:\n  squares = [x**2 for x in range(10)]\n  evens = [x for x in range(20) if x % 2 == 0]\n  pairs = [(x, y) for x in [1,2] for y in [3,4]]\n\nList comprehensions are generally faster than equivalent for-loops and map/filter calls because they are optimized at the bytecode level.' },
            { title: 'Nested List Comprehension', tags: ['Python', 'Advanced'], summary: 'You can nest list comprehensions for multi-dimensional data.\n\nFlatten a matrix:\n  matrix = [[1,2,3],[4,5,6],[7,8,9]]\n  flat = [num for row in matrix for num in row]\n  # [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\nTranspose:\n  transposed = [[row[i] for row in matrix] for i in range(3)]' },
            { title: 'Dict & Set Comprehension', tags: ['Python', 'Data Structures'], summary: 'Python also supports dict and set comprehensions.\n\nDict comprehension:\n  squares = {x: x**2 for x in range(6)}\n  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n\nSet comprehension:\n  unique_lengths = {len(word) for word in ["hello", "hi", "hey"]}\n  # {2, 3, 5}\n\nGenerator expression (lazy):\n  total = sum(x**2 for x in range(1000000))' }
        ],
        'react useeffect hook': [
            { title: 'useEffect — React Hook', tags: ['React', 'Hooks'], summary: 'useEffect lets you perform side effects in function components.\n\nBasic syntax:\n  useEffect(() => {\n    // effect logic\n    return () => { /* cleanup */ };\n  }, [dependencies]);\n\nRuns after every render if no dependency array is provided.\nRuns once on mount if dependency array is empty [].\nRuns when dependencies change if values are specified.' },
            { title: 'Common useEffect Patterns', tags: ['React', 'Patterns'], summary: 'Data fetching:\n  useEffect(() => {\n    fetch("/api/data")\n      .then(res => res.json())\n      .then(setData);\n  }, []);\n\nEvent listener:\n  useEffect(() => {\n    window.addEventListener("resize", handler);\n    return () => window.removeEventListener("resize", handler);\n  }, []);\n\nDebounced input:\n  useEffect(() => {\n    const timer = setTimeout(() => search(query), 300);\n    return () => clearTimeout(timer);\n  }, [query]);' },
            { title: 'useEffect Pitfalls', tags: ['React', 'Debugging'], summary: 'Common mistakes:\n\n1. Missing dependencies causes stale closures\n2. Objects/arrays in deps trigger infinite re-renders\n   → Use useMemo or compare individual values\n3. Forgetting cleanup causes memory leaks\n4. Async directly in useEffect is not allowed\n   → Define async function inside, then call it\n\n  useEffect(() => {\n    const fetchData = async () => {\n      const res = await fetch("/api");\n      setData(await res.json());\n    };\n    fetchData();\n  }, []);' }
        ],
        'css grid layout': [
            { title: 'CSS Grid — Fundamentals', tags: ['CSS', 'Layout'], summary: 'CSS Grid is a 2D layout system for the web.\n\nContainer:\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: auto;\n    gap: 16px;\n  }\n\nItems span multiple cells:\n  .item { grid-column: 1 / 3; }\n  .item { grid-row: span 2; }' },
            { title: 'Grid Template Areas', tags: ['CSS', 'Advanced'], summary: 'Named grid areas for readable layouts:\n\n  .layout {\n    display: grid;\n    grid-template-areas:\n      "header header header"\n      "sidebar main main"\n      "footer footer footer";\n    grid-template-columns: 200px 1fr 1fr;\n  }\n  .header { grid-area: header; }\n  .sidebar { grid-area: sidebar; }\n  .main { grid-area: main; }' },
            { title: 'Grid vs Flexbox', tags: ['CSS', 'Comparison'], summary: 'When to use each:\n\nGrid: 2D layouts (rows AND columns)\n  → Page layouts, dashboards, image galleries\n\nFlexbox: 1D layouts (row OR column)\n  → Navigation bars, card rows, centering\n\nBoth can be combined — use Grid for the page structure, Flexbox for component internals.' }
        ],
        'javascript promises': [
            { title: 'Promises — JavaScript', tags: ['JavaScript', 'Async'], summary: 'A Promise represents a value that may be available now, later, or never.\n\nCreating:\n  const p = new Promise((resolve, reject) => {\n    setTimeout(() => resolve("done"), 1000);\n  });\n\nConsuming:\n  p.then(val => console.log(val))\n   .catch(err => console.error(err))\n   .finally(() => console.log("complete"));' },
            { title: 'Promise Combinators', tags: ['JavaScript', 'Advanced'], summary: 'Promise.all([p1, p2])  — resolves when ALL resolve\nPromise.allSettled([p1, p2]) — waits for all, never rejects\nPromise.race([p1, p2]) — first to settle wins\nPromise.any([p1, p2])  — first to resolve wins\n\nExample:\n  const [users, posts] = await Promise.all([\n    fetch("/users").then(r => r.json()),\n    fetch("/posts").then(r => r.json())\n  ]);' },
            { title: 'Async/Await', tags: ['JavaScript', 'Modern'], summary: 'Syntactic sugar over Promises.\n\n  async function getData() {\n    try {\n      const res = await fetch("/api");\n      const data = await res.json();\n      return data;\n    } catch (err) {\n      console.error("Failed:", err);\n    }\n  }\n\nAsync functions always return a Promise.\nawait can only be used inside async functions (or at top level in modules).' }
        ],
        'git rebase vs merge': [
            { title: 'Git Merge', tags: ['Git', 'Branching'], summary: 'Merge creates a new merge commit combining two branches.\n\n  git checkout main\n  git merge feature-branch\n\nPros:\n  ✓ Preserves complete history\n  ✓ Non-destructive operation\n  ✓ Safe for shared branches\n\nCons:\n  ✗ Creates extra merge commits\n  ✗ History can become cluttered' },
            { title: 'Git Rebase', tags: ['Git', 'Branching'], summary: 'Rebase replays commits on top of another branch.\n\n  git checkout feature-branch\n  git rebase main\n\nPros:\n  ✓ Clean, linear history\n  ✓ Easier to read git log\n  ✓ Cleaner project history\n\nCons:\n  ✗ Rewrites commit history\n  ✗ NEVER use on shared/public branches\n  ✗ Can cause conflicts at each commit' },
            { title: 'When to Use Which', tags: ['Git', 'Best Practices'], summary: 'Use Merge when:\n  → Working on shared branches (main, develop)\n  → You want to preserve exact history\n  → Team policy requires merge commits\n\nUse Rebase when:\n  → Updating feature branch with latest main\n  → Cleaning up local commits before PR\n  → You want a linear, clean history\n\nGolden Rule: Never rebase commits that have been pushed to a shared remote.' }
        ],
        'sql join types': [
            { title: 'INNER JOIN', tags: ['SQL', 'Joins'], summary: 'Returns rows that have matching values in both tables.\n\n  SELECT u.name, o.total\n  FROM users u\n  INNER JOIN orders o ON u.id = o.user_id;\n\nOnly returns rows where there is a match in BOTH tables. This is the most common join type.' },
            { title: 'LEFT / RIGHT JOIN', tags: ['SQL', 'Joins'], summary: 'LEFT JOIN: Returns ALL rows from left table + matches from right.\n\n  SELECT u.name, o.total\n  FROM users u\n  LEFT JOIN orders o ON u.id = o.user_id;\n  -- Users without orders will have NULL for o.total\n\nRIGHT JOIN: Returns ALL rows from right table + matches from left.\nRIGHT JOIN is rarely used — just swap table order with LEFT JOIN.' },
            { title: 'FULL OUTER / CROSS JOIN', tags: ['SQL', 'Advanced'], summary: 'FULL OUTER JOIN: Returns all rows from both tables.\n  → NULLs where there is no match on either side\n\n  SELECT u.name, o.total\n  FROM users u\n  FULL OUTER JOIN orders o ON u.id = o.user_id;\n\nCROSS JOIN: Returns Cartesian product (every combination).\n  SELECT colors.name, sizes.name\n  FROM colors CROSS JOIN sizes;\n  -- If 3 colors × 4 sizes = 12 rows' }
        ],
        'docker compose basics': [
            { title: 'Docker Compose — Overview', tags: ['Docker', 'DevOps'], summary: 'Docker Compose defines and runs multi-container Docker apps.\n\nCreate a docker-compose.yml:\n  version: "3.8"\n  services:\n    web:\n      build: .\n      ports:\n        - "3000:3000"\n    db:\n      image: postgres:15\n      environment:\n        POSTGRES_PASSWORD: secret\n\nCommands:\n  docker compose up -d    # Start in background\n  docker compose down     # Stop and remove' },
            { title: 'Compose Networking & Volumes', tags: ['Docker', 'Storage'], summary: 'Services communicate by service name:\n  db connection: postgres://db:5432/mydb\n\nVolumes persist data:\n  services:\n    db:\n      volumes:\n        - pgdata:/var/lib/postgresql/data\n  volumes:\n    pgdata:\n\nBind mounts for development:\n  services:\n    web:\n      volumes:\n        - ./src:/app/src  # Live reload' },
            { title: 'Common Compose Patterns', tags: ['Docker', 'Patterns'], summary: 'Environment files:\n  services:\n    web:\n      env_file: .env\n\nDependency ordering:\n  services:\n    web:\n      depends_on:\n        - db\n        - redis\n\nHealth checks:\n  services:\n    db:\n      healthcheck:\n        test: ["CMD", "pg_isready"]\n        interval: 10s\n        timeout: 5s\n        retries: 5' }
        ],
        'node.js event loop': [
            { title: 'Event Loop — Node.js', tags: ['Node.js', 'Core'], summary: 'The Event Loop is how Node.js handles async operations on a single thread.\n\nPhases:\n  1. Timers — setTimeout, setInterval callbacks\n  2. Pending callbacks — system-level callbacks\n  3. Idle/Prepare — internal use\n  4. Poll — I/O callbacks (fs, network)\n  5. Check — setImmediate callbacks\n  6. Close — socket.on("close") callbacks\n\nMicrotasks (Promise.then, process.nextTick) run between each phase.' },
            { title: 'Blocking vs Non-Blocking', tags: ['Node.js', 'Performance'], summary: 'Non-blocking (good):\n  const data = await fs.promises.readFile("f.txt");\n\nBlocking (bad in server code):\n  const data = fs.readFileSync("f.txt");\n\nNever use synchronous I/O in production servers — it blocks the entire event loop and stops ALL other requests from being processed.' },
            { title: 'process.nextTick vs setImmediate', tags: ['Node.js', 'Advanced'], summary: 'process.nextTick:\n  → Runs BEFORE the event loop continues\n  → Higher priority than Promises\n  → Can starve I/O if overused\n\nsetImmediate:\n  → Runs in the Check phase\n  → After I/O events are processed\n  → Safer for recursive operations\n\nPriority order:\n  1. process.nextTick\n  2. Promise.then (microtask)\n  3. setTimeout(fn, 0)\n  4. setImmediate' }
        ],
        'rust ownership model': [
            { title: 'Ownership — Rust', tags: ['Rust', 'Memory'], summary: 'Rust uses ownership to manage memory without a garbage collector.\n\nRules:\n  1. Each value has exactly ONE owner\n  2. When the owner goes out of scope, the value is dropped\n  3. Values can be moved or borrowed\n\nExample:\n  let s1 = String::from("hello");\n  let s2 = s1; // s1 is MOVED to s2\n  // println!("{}", s1); // ERROR: s1 no longer valid' },
            { title: 'Borrowing & References', tags: ['Rust', 'References'], summary: 'Borrowing lets you reference a value without taking ownership.\n\nImmutable borrow (&T):\n  fn len(s: &String) -> usize { s.len() }\n  let s = String::from("hi");\n  let n = len(&s); // s is still valid\n\nMutable borrow (&mut T):\n  fn push(s: &mut String) { s.push_str("!"); }\n\nRule: You can have EITHER:\n  • Multiple immutable references\n  • ONE mutable reference\n  Never both at the same time.' },
            { title: 'Lifetimes', tags: ['Rust', 'Advanced'], summary: 'Lifetimes prevent dangling references.\n\nAnnotation syntax:\n  fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {\n      if x.len() > y.len() { x } else { y }\n  }\n\nThe \'a lifetime says: the returned reference lives as long as the shorter of the two input lifetimes.\n\nLifetimes are checked at compile time — zero runtime cost.' }
        ],
        'go goroutines': [
            { title: 'Goroutines — Go', tags: ['Go', 'Concurrency'], summary: 'Goroutines are lightweight threads managed by the Go runtime.\n\nLaunch with the go keyword:\n  go func() {\n      fmt.Println("running in goroutine")\n  }()\n\nKey facts:\n  • Goroutines start with ~2KB stack (auto-grows)\n  • Millions can run concurrently\n  • Multiplexed onto OS threads by the runtime\n  • Use channels for communication' },
            { title: 'Channels', tags: ['Go', 'Communication'], summary: 'Channels are typed conduits for goroutine communication.\n\nCreate:\n  ch := make(chan int)\n\nSend & Receive:\n  ch <- 42      // send\n  val := <-ch   // receive (blocks until data)\n\nBuffered channels:\n  ch := make(chan int, 5) // buffer of 5\n\nCommon pattern:\n  func worker(ch chan<- int) {\n      ch <- doWork()\n  }\n  go worker(resultCh)\n  result := <-resultCh' },
            { title: 'Select Statement', tags: ['Go', 'Patterns'], summary: 'Select lets you wait on multiple channels.\n\n  select {\n  case msg := <-ch1:\n      fmt.Println("from ch1:", msg)\n  case msg := <-ch2:\n      fmt.Println("from ch2:", msg)\n  case <-time.After(5 * time.Second):\n      fmt.Println("timeout")\n  default:\n      fmt.Println("no data ready")\n  }\n\nLike switch but for channels. Blocks until one case is ready.' }
        ],
        'mongodb aggregation': [
            { title: 'Aggregation Pipeline — MongoDB', tags: ['MongoDB', 'Queries'], summary: 'The aggregation pipeline processes documents through stages.\n\nBasic syntax:\n  db.orders.aggregate([\n    { $match: { status: "completed" } },\n    { $group: {\n        _id: "$customerId",\n        total: { $sum: "$amount" }\n    }},\n    { $sort: { total: -1 } },\n    { $limit: 10 }\n  ])\n\nCommon stages: $match, $group, $sort, $project, $lookup, $unwind, $limit, $skip' },
            { title: '$lookup (JOIN)', tags: ['MongoDB', 'Joins'], summary: 'Perform left outer joins between collections.\n\n  db.orders.aggregate([\n    { $lookup: {\n        from: "customers",\n        localField: "customerId",\n        foreignField: "_id",\n        as: "customerInfo"\n    }},\n    { $unwind: "$customerInfo" }\n  ])\n\n$unwind deconstructs the joined array into individual documents.' },
            { title: 'Aggregation Operators', tags: ['MongoDB', 'Operators'], summary: 'Accumulator operators (in $group):\n  $sum, $avg, $min, $max, $first, $last, $push, $addToSet\n\nExpression operators:\n  $cond — conditional\n  $ifNull — null check\n  $concat — string join\n  $dateToString — format dates\n\nExample:\n  { $group: {\n      _id: null,\n      avgPrice: { $avg: "$price" },\n      products: { $push: "$name" }\n  }}' }
        ],
        'bash scripting': [
            { title: 'Bash Scripting Basics', tags: ['Bash', 'Shell'], summary: 'Start every script with a shebang:\n  #!/bin/bash\n\nVariables:\n  name="World"\n  echo "Hello $name"\n\nConditionals:\n  if [ "$x" -gt 10 ]; then\n      echo "big"\n  elif [ "$x" -gt 5 ]; then\n      echo "medium"\n  else\n      echo "small"\n  fi\n\nMake executable:\n  chmod +x script.sh\n  ./script.sh' },
            { title: 'Loops in Bash', tags: ['Bash', 'Control Flow'], summary: 'For loop:\n  for i in 1 2 3 4 5; do\n      echo "Number: $i"\n  done\n\nC-style for:\n  for ((i=0; i<10; i++)); do\n      echo $i\n  done\n\nWhile loop:\n  count=0\n  while [ $count -lt 5 ]; do\n      echo $count\n      ((count++))\n  done\n\nIterate files:\n  for file in *.txt; do\n      echo "Processing: $file"\n  done' },
            { title: 'Useful Bash Patterns', tags: ['Bash', 'Patterns'], summary: 'Command substitution:\n  today=$(date +%Y-%m-%d)\n\nString operations:\n  ${var:-default}   # default if unset\n  ${var:0:5}        # substring\n  ${var/old/new}    # replace\n\nFunctions:\n  greet() {\n      echo "Hello, $1!"\n  }\n  greet "World"\n\nError handling:\n  set -euo pipefail  # exit on error\n  trap cleanup EXIT   # cleanup on exit' }
        ],
        'c++ smart pointers': [
            { title: 'Smart Pointers — C++', tags: ['C++', 'Memory'], summary: 'Smart pointers automatically manage memory (RAII).\n\nunique_ptr (exclusive ownership):\n  auto p = std::make_unique<int>(42);\n  // auto p2 = p; // ERROR: cannot copy\n  auto p2 = std::move(p); // OK: move\n\nshared_ptr (shared ownership):\n  auto p = std::make_shared<int>(42);\n  auto p2 = p; // OK: ref count = 2\n  // Freed when last shared_ptr is destroyed\n\nweak_ptr (non-owning observer):\n  std::weak_ptr<int> w = p;\n  if (auto locked = w.lock()) { /* use */ }' },
            { title: 'When to Use Which', tags: ['C++', 'Best Practices'], summary: 'unique_ptr:\n  → Default choice for ownership\n  → Factory functions\n  → Pimpl idiom\n  → Collections of polymorphic objects\n\nshared_ptr:\n  → Multiple owners needed\n  → Shared caches\n  → Observer patterns with weak_ptr\n\nweak_ptr:\n  → Breaking circular references\n  → Caching (check if still alive)\n  → Observer pattern\n\nAvoid: raw new/delete in modern C++.' },
            { title: 'Custom Deleters', tags: ['C++', 'Advanced'], summary: 'Smart pointers can use custom deleters.\n\nExample (file handle):\n  auto deleter = [](FILE* f) { fclose(f); };\n  std::unique_ptr<FILE, decltype(deleter)>\n      file(fopen("data.txt", "r"), deleter);\n\nExample (C API):\n  auto del = [](SDL_Window* w) {\n      SDL_DestroyWindow(w);\n  };\n  std::unique_ptr<SDL_Window, decltype(del)>\n      win(SDL_CreateWindow(...), del);' }
        ],
        'java streams': [
            { title: 'Java Streams API', tags: ['Java', 'Functional'], summary: 'Streams process collections declaratively.\n\nBasic pipeline:\n  List<String> result = names.stream()\n      .filter(n -> n.length() > 3)\n      .map(String::toUpperCase)\n      .sorted()\n      .collect(Collectors.toList());\n\nCreating streams:\n  Stream.of("a", "b", "c")\n  Arrays.stream(myArray)\n  collection.stream()\n  IntStream.range(0, 10)' },
            { title: 'Common Stream Operations', tags: ['Java', 'Operations'], summary: 'Intermediate (lazy):\n  .filter(predicate) — keep matching\n  .map(func) — transform\n  .flatMap(func) — flatten nested\n  .sorted() — natural order\n  .distinct() — remove duplicates\n  .limit(n) — take first n\n\nTerminal (trigger execution):\n  .collect() — gather results\n  .forEach() — side effects\n  .reduce() — combine elements\n  .count() — count elements\n  .findFirst() — get first match\n  .anyMatch() — check condition' },
            { title: 'Collectors & Grouping', tags: ['Java', 'Advanced'], summary: 'Group by:\n  Map<String, List<Person>> byCity =\n      people.stream()\n          .collect(Collectors.groupingBy(\n              Person::getCity\n          ));\n\nJoin strings:\n  String csv = names.stream()\n      .collect(Collectors.joining(", "));\n\nStatistics:\n  IntSummaryStatistics stats =\n      numbers.stream()\n          .mapToInt(Integer::intValue)\n          .summaryStatistics();\n  stats.getAverage(); stats.getMax();' }
        ]
    },

    render() {
        Navbar.renderTopbar('Developer Documentation');
        const content = document.getElementById('page-content');
        
        const randomSuggestionsHtml = this.docSuggestions.sort(() => 0.5 - Math.random()).slice(0, 6)
            .map(s => `<button class="ai-suggest-chip" data-q="${s}">${s}</button>`).join('');

        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Developer <span class="text-gradient">Docs</span></h1>
                    <p>Instantly search for documentation across ANY programming language, framework, or tool.</p>
                </div>
                
                <div class="glass-card mb-md" style="display:flex; gap:12px; align-items:center;">
                    <div class="input-group" style="flex:1;">
                        <i class="input-icon fa-solid fa-magnifying-glass"></i>
                        <input class="input-field has-icon" id="docs-search-input" type="text" placeholder="e.g. Python list comprehension, React hooks, Rust ownership..." />
                    </div>
                    <button class="btn btn-primary" id="docs-search-btn">Search Docs</button>
                </div>

                <div class="ai-bot-suggestions mb-lg" id="docs-suggestions" style="justify-content:flex-start;">
                    ${randomSuggestionsHtml}
                </div>

                <div id="docs-loading" style="display:none; text-align:center; padding:40px 0;">
                    <div class="spinner" style="margin: 0 auto 16px; width:40px; height:40px; border:4px solid rgba(212,168,67,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
                    <p class="text-muted">AI is retrieving documentation...</p>
                </div>

                <div id="docs-results-area" style="display:none;">
                    <h3 class="mb-md" style="font-weight:600;"><i class="fa-solid fa-book" style="color:var(--primary-light);margin-right:8px;"></i> Search Results</h3>
                    <div class="grid-3" id="docs-results-grid"></div>
                </div>

                <div id="docs-empty" style="text-align:center; padding: 60px 0;">
                    <i class="fa-solid fa-book-open-reader text-muted mb-md" style="font-size:3rem; opacity:0.5;"></i>
                    <h3 style="color:var(--text-secondary); margin-bottom:8px;">Search for any development concept</h3>
                    <p class="text-muted text-sm" style="max-width:400px; margin:0 auto;">Leverages AI to instantly generate accurate documentation, syntax guides, and explanations for literally any programming language.</p>
                </div>
            </div>
        `;

        this.bindEvents();
    },

    bindEvents() {
        const btn = document.getElementById('docs-search-btn');
        const input = document.getElementById('docs-search-input');
        
        btn.addEventListener('click', () => this.searchDocs(input.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.searchDocs(input.value);
        });

        document.getElementById('docs-suggestions').addEventListener('click', (e) => {
            if(e.target.classList.contains('ai-suggest-chip')) {
                input.value = e.target.dataset.q;
                this.searchDocs(input.value);
            }
        });
    },

    _findQuickDocs(query) {
        const q = query.toLowerCase().trim();
        for (const [key, docs] of Object.entries(this.quickDocs)) {
            if (q.includes(key) || key.includes(q)) return docs;
        }
        const words = q.split(/\s+/).filter(w => w.length > 2);
        for (const [key, docs] of Object.entries(this.quickDocs)) {
            const keyWords = key.split(/\s+/);
            const matched = words.filter(w => keyWords.some(kw => kw.includes(w) || w.includes(kw)));
            if (matched.length >= 2) return docs;
        }
        return null;
    },

    _renderDocs(docs) {
        document.getElementById('docs-loading').style.display = 'none';
        document.getElementById('docs-results-area').style.display = 'block';

        if (!Array.isArray(docs) || docs.length === 0) {
            document.getElementById('docs-results-grid').innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:var(--text-muted);"><i class="fa-regular fa-face-frown mb-sm" style="font-size:1.5rem;"></i><br>Failed to retrieve documentation.</div>';
            return;
        }

        document.getElementById('docs-results-grid').innerHTML = docs.map((doc, idx) => {
            const title = doc.title || doc.name || doc.concept || 'Documentation';
            const summary = doc.summary || doc.description || doc.content || doc.explanation || '';
            const tags = doc.tags || doc.keywords || [];

            const formattedSummary = Helpers.escapeHtml(summary)
                .replace(/\n/g, '<br>')
                .replace(/`([^`]+)`/g, '<code style="background:rgba(212,168,67,0.1);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.8em;color:var(--primary-light);">$1</code>');

            return `
                <div class="glass-card" style="animation:slideUp 0.3s ease ${idx * 0.05}s both; display:flex; flex-direction:column;">
                    <div style="flex:1;">
                        <h4 style="font-size:1.05rem; font-weight:600; margin-bottom:8px; color:var(--primary-light);">
                            ${Helpers.escapeHtml(title)}
                        </h4>
                        <div style="margin-bottom:12px; display:flex; flex-wrap:wrap; gap:6px;">
                            ${tags.map(tag => `<span class="tag tag-primary"><i class="fa-solid fa-code"></i> ${Helpers.escapeHtml(tag)}</span>`).join('')}
                        </div>
                        <div class="text-sm text-secondary" style="line-height:1.7;">
                            ${formattedSummary || '<span class="text-muted">No summary available.</span>'}
                        </div>
                    </div>
                </div>`;
        }).join('');
    },

    async searchDocs(query) {
        query = query.trim();
        if (!query) return Toast.show('Please enter a search term', 'warning');

        document.getElementById('docs-empty').style.display = 'none';
        document.getElementById('docs-results-area').style.display = 'none';
        document.getElementById('docs-loading').style.display = 'block';

        const btn = document.getElementById('docs-search-btn');
        btn.disabled = true;

        const quickResult = this._findQuickDocs(query);
        if (quickResult) {
            setTimeout(() => {
                this._renderDocs(quickResult);
                btn.disabled = false;
            }, 300);
            return;
        }

        const aiModel = (typeof AskAiPage !== 'undefined' && AskAiPage.currentAiModel) ? AskAiPage.currentAiModel : 'openai';

        const systemPrompt = `You are a JSON API that returns programming documentation. Return ONLY a valid JSON array with NO markdown, NO code fences, NO explanation text. The array must have exactly 3 objects. Each object MUST have these fields:
{"title":"string - concept name with language in parentheses","tags":["string","string"],"summary":"string - detailed explanation with code examples using newlines"}
Example response format:
[{"title":"Array.map() (JavaScript)","tags":["JavaScript","Array"],"summary":"The map() method creates a new array by calling a function on every element.\\n\\nSyntax:\\n  array.map(callback(element, index, array))\\n\\nExample:\\n  const nums = [1,2,3];\\n  const doubled = nums.map(n => n * 2);\\n  // [2, 4, 6]"}]
Respond with ONLY the JSON array. No other text.`;

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 25000);
            
            let res;
            try {
                res = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: 'Topic: ' + query + '. Return ONLY a JSON array.' }
                        ],
                        jsonMode: true,
                        model: aiModel
                    }),
                    signal: controller.signal
                });
            } catch(e) { }
            clearTimeout(timeout);

            if(!res || !res.ok) {
                res = await fetch('https://text.pollinations.ai/' + encodeURIComponent(systemPrompt + '\n\nTopic: ' + query + '. Return ONLY JSON array.') + `?model=${aiModel}`);
            }

            let text = await res.text();
            text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

            let parsed = null;
            
            // Attempt 1: Direct parse
            try { parsed = JSON.parse(text); } catch(e1) {}
            
            // Attempt 2: Find [ ... ] array
            if (!parsed) {
                const arrStart = text.indexOf('[');
                const arrEnd = text.lastIndexOf(']');
                if (arrStart !== -1 && arrEnd !== -1 && arrEnd > arrStart) {
                    try {
                        let cleaned = text.substring(arrStart, arrEnd + 1);
                        cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, ' ').replace(/,\s*]/g, ']').replace(/,\s*}/g, '}');
                        parsed = JSON.parse(cleaned);
                    } catch(e2) {}
                }
            }
            
            // Attempt 3: Find individual { ... } objects
            if (!parsed) {
                const objStart = text.indexOf('{');
                const objEnd = text.lastIndexOf('}');
                if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
                    try {
                        let cleaned = text.substring(objStart, objEnd + 1);
                        cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, ' ').replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                        parsed = [JSON.parse(cleaned)];
                    } catch(e3) {}
                }
            }
            
            // Attempt 4: Try to find multiple JSON objects
            if (!parsed) {
                const jsonObjects = [];
                const regex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
                let match;
                while ((match = regex.exec(text)) !== null) {
                    try {
                        jsonObjects.push(JSON.parse(match[0]));
                    } catch(e) {}
                }
                if (jsonObjects.length > 0) parsed = jsonObjects;
            }

            if (!parsed || (Array.isArray(parsed) && parsed.length === 0)) {
                document.getElementById('docs-loading').style.display = 'none';
                document.getElementById('docs-results-area').style.display = 'block';
                document.getElementById('docs-results-grid').innerHTML = `
                    <div class="glass-card" style="grid-column:1/-1; text-align:center; padding:30px;">
                        <i class="fa-solid fa-robot" style="font-size:2rem; color:var(--primary); margin-bottom:12px;"></i>
                        <h4 style="color:var(--text-secondary); margin-bottom:8px;">AI response couldn't be parsed</h4>
                        <p class="text-muted text-sm">The AI returned a non-standard format. Please try again or use a different search term.</p>
                    </div>`;
                return;
            }

            let docs = [];
            if (Array.isArray(parsed)) {
                docs = parsed;
            } else if (parsed && typeof parsed === 'object') {
                const arrayVal = Object.values(parsed).find(v => Array.isArray(v));
                if (arrayVal) {
                    docs = arrayVal;
                } else {
                    docs = [parsed];
                }
            }

            const validDocs = docs.filter(d => d && typeof d === 'object').map(d => ({
                title: d.title || d.name || d.concept || query,
                tags: d.tags || d.keywords || [],
                summary: d.summary || d.description || d.content || d.explanation || d.details || ''
            }));

            this._renderDocs(validDocs.length > 0 ? validDocs : docs);

        } catch(err) {
            console.error('Docs search error:', err);
            document.getElementById('docs-loading').style.display = 'none';
            document.getElementById('docs-empty').style.display = 'block';
            Toast.show('Failed to fetch documentation. Please try again.', 'error');
        } finally {
            btn.disabled = false;
        }
    }
};
