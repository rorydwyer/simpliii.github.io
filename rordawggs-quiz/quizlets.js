//Rory Dwyer
//Lab 2
//5/10/2017


let quizes = [{
        "questions": [{
            "title": "Bobs and lindas Anni",
            "q": "When is Bob and Linda's anniversary? ",
            "age": 2,
            "a": "Sept 3rd",
            "options": ["Dec 3rd", "Dec 6th", "Sept 9th", "May 12th"]
        }, {
            "title": "love-test",
            "q": "Where does Bob finally find the Love-Testometer in the episode \"My Fuzzy Valentine\"?",
            "age": 2,
            "a": "Drink Dynasty Lounge",
            "options": ["Peking Duck Dynasty Bar", "The Great Bar of China", "Emperor's Bar and Lounge", "Some other Lounge"]
        }, {
            "title": "news anchor",
            "q": "What is the name of the local news affiliate's anchor?",
            "age": 2,
            "a": "Olson Benner",
            "options": ["Brennan Tate", "Meryl Winters", "Bob", "Brad"]
        }, {
            "title": "purp store",
            "q": "What is the name of the purple store next to Jimmy Pesto's Pizzeria?",
            "age": 2,
            "a": "Yours Truly Stationery",
            "options": ["That's Notable Stationery ", "Staples n Stuff Stationery", "With Love Stationery", "Bradley Stationrey"]
        }, {
            "title": "fig",
            "q": "What did the kids try to buy at Fig Jam that got them banned from coming in again?",
            "age": 2,
            "a": "Dark chocolate with bacon and red pepper flakes",
            "options": ["Chocolate covered edameme", "Artisan gummy bears", "Red pepper pretzels with caramel covered popcorn", "Brad's red pretzel covered gummy bears"]
        }, {
            "title": "site",
            "q": "What is the name of the website Linda's dad likes to visit?",
            "age": 2,
            "a": "www.woman-inflates-a-balloon-and-sits-on-it-and-pops-it.com",
            "options": ["www.poppers.com", "www.woman-inflates-a-balloon-and-sits-on-it-and-pops-it.net", "www.people-who-like-to-pop-stuff.com", "www.brad-inflates-a-ballon-and-sits-on-it-and-pops-it.com"]
        }, {
            "title": "nameog edith",
            "q": "What is the name of Edith's (the owner of the arts and crafts store, Reflections) husband?",
            "age": 2,
            "a": "Harold",
            "options": ["Arnold", "Edmund", "Peter", "Brad"]
        }, {
            "title": "hotel",
            "q": "What is the name of the hotel where Louise attempts to rent a room as Beatrice Black in the episode \"The Kids Run Away\"?",
            "age": 2,
            "a": "The Royal Coat of Arms Hotel",
            "options": ["Spinnaker Hotel", "Decency Inn", "Okay Hotel", "The deep and mysterious cave of which Brad roams and rents. "]
        }, {
            "title": "Rudy",
            "q": "We all love Regular-Sized Rudy at Wagstaff, but what is the name of the other Rudy at school?",
            "age": 2,
            "a": "Pocket Sized Rudy",
            "options": ["Abnormally Large Rudy", "Small Rudy", "Medium Sized Rudy", "A Rudy that is much similar to Bradley"]
        }, {
            "title": "dress up",
            "q": "Who does Daryl dress up as for Halloween in the episode \"Fort Night\"?",
            "age": 2,
            "a": "Mark Mothersbaugh",
            "options": ["A red crayon", "Dwayne \"The Rock\" Johnson", "1980 era Michael jackson", "JOOOHHHNNNN CEEENNNNAAA!!!!"]
        }, {
            "title": "hat",
            "q": "What color is Louise Belchers hat",
            "age": 1,
            "a": "Pink",
            "options": ["Red", "Yellow", "Blue", "Somewhere in between "]
        }, {
            "title": "hat",
            "q": "What sound does Gene Belcher like to make with his keyboard",
            "age": 1,
            "a": "Fart noises",
            "options": ["Cat noises", "Bird sounds", "Car horns", "People yelling"]
        }, {
            "title": "tina",
            "q": "What animal does Tina Belcher like?",
            "age": 1,
            "a": "Ponies",
            "options": ["Rhinos", "Squids", "Spiders", "Lobsters"]
        }, {
            "title": "sign",
            "q": "What costume does Gene Belcher wear to promote the shop?",
            "age": 1,
            "a": "A Burger ",
            "options": ["A squash", "A Potatoe", "A very long banana", "A Brad"]
        }, {
            "title": "butts",
            "q": "Who in the Belcher Family likes Butts",
            "age": 1,
            "a": "Tina",
            "options": ["Louise", "Bob", "Linda", "Gene"]
        }, {
            "title": "teddy",
            "q": "Who is Bob's Best friend",
            "age": 1,
            "a": "Teddy",
            "options": ["Louise", "Bob", "Linda", "Gene"]
        }, {
            "title": "bobs wife",
            "q": "What is the name of Bob's Wife?",
            "age": 1,
            "a": "Linda",
            "options": ["Lydia", "Lyda", "Luchy", "Bradley of course"]
        }, {
            "title": "crush",
            "q": "Who does Tina have a crush on?",
            "age": 1,
            "a": "Jimmy Jr",
            "options": ["Zeke", "Ollie", "Andy", "Rudy"]
        }, {
            "title": "bunny ears",
            "q": "Who steals Louise's bunny ears?",
            "age": 1,
            "a": "Logan",
            "options": ["Zeke", "Gene", "Josh", "Rudy"]
        }, {
            "title": "mort",
            "q": "What job does Mort have?",
            "age": 1,
            "a": "Mortician",
            "options": ["Teacher", "Taxi Driver", "Electriction", "Restaurant owner"]
        }, {
            "title": "genes band",
            "q": "What does Gene name his girl band?",
            "age": 1,
            "a": "The Cutie Patooties",
            "options": ["Girls 4 now", "Dream Girls", "Cheetah Girls", "enter generic girl band name here"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }, {
            "title": "old",
            "q": "You're too old to watch this show, i dont have any questions for you...",
            "age": 3,
            "a": "ok",
            "options": ["ok...", "What about Brad?", "Well ok then", "okay"]
        }],
        "title": "Bobs Burgers!",
        "desc": "We got some BEEFY questions for you"
    },
    {
        "questions": [{
            "title": "math",
            "q": "10 + 10",
            "age": 1,
            "a": "20",
            "options": ["21", "30", "10", "IDK"]
        }, {
            "title": "math",
            "q": "10 * 10",
            "age": 1,
            "a": "100",
            "options": ["1000", "10", "20", "well, it could be 1010"]
        }, {
            "title": "math",
            "q": "5 - 2",
            "age": 1,
            "a": "3",
            "options": ["2", "1", "0", "yeah, it could be 5-2"]
        }, {
            "title": "math",
            "q": "15 + 18",
            "age": 1,
            "a": "33",
            "options": ["32", "35", "0", "JOHN CENA!!!"]
        }, {
            "title": "math",
            "q": "12 * 12",
            "age": 1,
            "a": "144",
            "options": ["122", "I like bobs test better", "164", "Where did Brad go?"]
        }, {
            "title": "math",
            "q": "150 - 35",
            "age": 1,
            "a": "115",
            "options": ["125", "105", "100005", "Its over 9000!!!"]
        }, {
            "title": "math",
            "q": "13 - 15",
            "age": 1,
            "a": "-2",
            "options": ["-1", "0", "sub zero", "somewhere less than 0"]
        }, {
            "title": "math",
            "q": "12 + 9 + 2",
            "age": 1,
            "a": "23",
            "options": ["20", "24", "21", "well, I could care less"]
        }, {
            "title": "math",
            "q": "22 / 2",
            "age": 1,
            "a": "11",
            "options": ["12", "11.5", "2", "10"]
        }, {
            "title": "math",
            "q": "Can i has coffee?",
            "age": 1,
            "a": "Brad has coffee for ya",
            "options": ["no", "no ways", "well nope", "nopers"]
        }, {
            "title": "math",
            "q": "What is the next prime number after 7?",
            "age": 2,
            "a": "11",
            "options": ["13", "15", "9", "10"]
        }, {
            "title": "math",
            "q": "The perimeter of a circle is also known as what?",
            "age": 2,
            "a": "The Circumference",
            "options": ["Pi", "The Radius", "Around the circle right?", "The surface"]
        }, {
            "title": "math",
            "q": "65 - 43",
            "age": 2,
            "a": "22",
            "options": ["21", "23", "43", "29"]
        }, {
            "title": "math",
            "q": "What does the square root of 144 equal?",
            "age": 2,
            "a": "12",
            "options": ["9", "6", "24", "29"]
        }, {
            "title": "math",
            "q": "52 divided by 4 equals what?",
            "age": 2,
            "a": "13",
            "options": ["9", "6", "24", "29"]
        }, {
            "title": "math",
            "q": "How many sides does a nonagon have?",
            "age": 2,
            "a": "9",
            "options": ["non", "0", "breaded sides", "12"]
        }, {
            "title": "math",
            "q": "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ?",
            "age": 2,
            "a": "55",
            "options": ["45", "34", "40", "41"]
        }, {
            "title": "math",
            "q": "In statistics, the middle value of an ordered set of values is called what?",
            "age": 2,
            "a": "The Medium",
            "options": ["The Average", "The Inbetween", "The Mean", "42"]
        }, {
            "title": "math",
            "q": "What does 3 squared equal?",
            "age": 2,
            "a": "9",
            "options": ["6", "12", "18", "31"]
        }, {
            "title": "math",
            "q": "5 to the power of 0 equals what?",
            "age": 2,
            "a": "1",
            "options": ["0", "5", "25", "More coffee please"]
        }, {
            "title": "math",
            "q": "6372+584",
            "age": 3,
            "a": "12221",
            "options": ["14253", "03523", "74839", "11224"]
        }, {
            "title": "math",
            "q": "Ok,If there are 23 boys and 21 boys are in class A,Class B has 21 boys and 22 girls, how many girls and boys are there in Class A and B?",
            "age": 3,
            "a": "87",
            "options": ["73", "69", "91", "6252 hmm?!"]
        }, {
            "title": "math",
            "q": "Ok, this is one tough question, what if you divide 352 by 12?",
            "age": 3,
            "a": "29.3",
            "options": ["29", "28.8", "31.2", "wait, huh?"]
        }, {
            "title": "math",
            "q": "Your mom is in the market, she buy 22kg of fish and 24kg of chicken, you ate 4kg of chicken and 12kg of fish, how many kg was left of the 2 foods?",
            "age": 3,
            "a": "30kg",
            "options": ["30kg", "28kg", "41kg", "34kg"]
        }, {
            "title": "math",
            "q": "You have $30.00,You bout a flower that costs $4.50 and sell it to a lady,she give you $1.20,Then you go to the donut store and bought 3 pieces of donuts that costs $12.45,how many money do you still have?",
            "age": 3,
            "a": "$14.25",
            "options": ["$17.70", "$14.40", "$10.00", "I don't want to waste my moneys tho..."]
        }, {
            "title": "math",
            "q": "One day, a person went to a horse racing area. Instead of counting the number of humans an horses, he counted 74 heads and 196 legs. How many humans and horses were there?",
            "age": 3,
            "a": "24 horses and 50 humans",
            "options": ["37 humans and 98 horses", "31 horses and 74 humans", "24 humans and 50 horses", "I just like looking at dem purdy ponies"]
        }, {
            "title": "math",
            "q": "What is the square root of 5?",
            "age": 3,
            "a": "2.23",
            "options": ["4", "2", "10", "3"]
        }, {
            "title": "math",
            "q": "338 / 3",
            "age": 3,
            "a": "112.66",
            "options": ["120", "30", "40", "59.55"]
        }, {
            "title": "math",
            "q": "3987 * 45",
            "age": 3,
            "a": "179415",
            "options": ["241245", "93525", "188223", "39299"]
        }, {
            "title": "math",
            "q": "What is 1 liter equal to?",
            "age": 3,
            "a": "none",
            "options": ["1 cup", "1 pint", "1 quart", "1 gallon"]
        }, {
            "title": "math",
            "q": "What is the pattern for all the prime numbers",
            "age": 3,
            "a": "There isn't one",
            "options": ["Fibonacci sequence", "Prime Quadratics Formual", "The Beta of Prime numbers", "Calculus"]
        }],
        "title": "Maths",
        "desc": "Got some maths for ya ta solve"
    }

];
