// ------------------------------------------------------------------------------------------------------------
// Фигарь запрос на получение массива работ, прямо в этом файле, тогда остальную логику можно вообще не трогать
// var vacanciesData = { Твой запрос };
// ------------------------------------------------------------------------------------------------------------
// ДАННЫЕ: (id страны, город, Название вакансии, Описание, Ссылка на источник,
// Зарплата [Возможно стоит взять диапазон, например 200-250$], Когда была опубликована )
var vacanciesData =
    [{id: 'RUS', city: 'New York', name: 'Senior Python Developer', desc: '', href: '', salary: 1800, posted: 'December 24, 2017'},
    {id: 'RUS', name: 'Automation Tools Programmer', desc: '', href: '', salary: 2100},
    {id: 'RUS', name: 'Analyst', desc: '', href: '', salary: 1900},
    {id: 'RUS', name: 'Python Programmer Job', desc: '', href: '', salary: 10000},
    {id: 'RUS', name: 'Computer Science Intern', desc: '', href: '', salary: 4300},
    {id: 'RUS', name: 'Full-Stack Developer Python/Django', desc: '', href: '', salary: 2200},
    {id: 'RUS', name: 'Software Developer - Apple Diagnostics', desc: '', href: '', salary: 4500},
    {id: 'RUS', name: 'Web Programmer / Software Engineer (wqweb)', desc: '', href: '', salary: 8900},
    {id: 'RUS', name: 'Scientific Programmer', desc: '', href: '', salary: 13000},
    {id: 'RUS', name: 'Computational Thinking Web Developer/Programmer (Python)', desc: '', href: '', salary: 9000},
    {id: 'RUS', name: 'Software Engineer, Functional Programming', desc: '', href: '', salary: 7000},
    {id: 'RUS', name: 'Programmer / Developer Lead - Python Developer', desc: '', href: '', salary: 7400},
    {id: 'RUS', name: 'Scientific Programmer/Data Analyst', desc: '', href: '', salary: 4300},
    {id: 'RUS', name: 'Full-stack Software Developer', desc: '', href: '', salary: 300},
    {id: 'RUS', name: 'Full Stack Web Developer', desc: '', href: '', salary: 200},
    {id: 'RUS', name: 'Back End Developer – Intern', desc: '', href: '', salary: 950},
    {id: 'RUS', name: 'IT Security Engineer', desc: '', href: '', salary: 1500},
    {id: 'RUS', name: 'IT Security Engineer', desc: '', href: '', salary: 1200},
    {id: 'RUS', name: 'Front End Software Engineer', desc: '', href: '', salary: 1300},
    {id: 'RUS', name: 'Web Engineer ', desc: '', href: '', salary: 1200},
    {id: 'RUS', name: 'Intermediate Application Engineer, Web/Java/Python/Node.js', desc: '', salary: 1900},
    {id: 'JPN', name: 'Junior Software Engineer', desc: '', href: '', salary: 800},
    {id: 'JPN', name: 'Backend Python Web Developer', desc: '', href: '', salary: 900},
    {id: 'JPN', name: 'Senior Events Manager', desc: '', href: '', salary: 1300},
    {id: 'KAZ', name: 'Back-End Web Developer', desc: '', href: '', salary: 6500},
    {id: 'TUR', name: 'C# Full Stack Software Engineer Startup', desc: '', salary: 435},
    {id: 'BRA', name: 'Java Programming Intern', desc: '', salary: 8500},
    {id: 'USA', name: 'Java Web Application Developer', desc: '', salary: 2200},
    {id: 'SWE', name: 'Java/Spring/Groovy Full Stack Software Engineer', desc: '', salary: 730},
    {id: 'IND', name: 'Junior Software Engineer (Android concentration)', desc: '', salary: 3000},
    {id: 'CHN', name: 'Software Engineer - Middle Tier/Back-End', desc: '', salary: 9700},
    {id: 'CHN', name: 'Business Application Development Intern 2018', desc: '', salary: 4000},
    {id: 'CHN', name: 'Procurement Coordinator - Strategy', desc: '', salary: 3500},
    {id: 'IRN', name: 'Software Engineer Summer Intern', desc: '', salary: 2500},
    {id: 'AFG', name: 'E-Commerce Junior Web Analyst', desc: '', salary: 6500},
    {id: 'UKR', name: 'Web Development Intern', desc: '', salary: 2050},
    {id: 'POL', name: 'Programme Manager', desc: '', salary: 1400},
    {id: 'RUS', name: 'Property Project Manager', desc: '', salary: 2340}];