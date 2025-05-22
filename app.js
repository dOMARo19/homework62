const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Налаштування PUG для маршрутів /users
app.set('views', path.join(__dirname, 'views/pug'));
app.set('view engine', 'pug');

// Налаштування EJS для маршрутів /articles
app.engine('ejs', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views/ejs'));

// Middleware для статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Приклад даних
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45 }
];

const articles = [
  { id: 1, title: 'Introduction to Node.js', content: 'Node.js is a JavaScript runtime...', author: 'John Doe' },
  { id: 2, title: 'Express Framework Basics', content: 'Express is a minimal and flexible Node.js web application framework...', author: 'Jane Smith' },
  { id: 3, title: 'Template Engines Overview', content: 'Template engines allow you to render dynamic content...', author: 'Bob Johnson' }
];

// Маршрути для користувачів (PUG)
app.get('/users', (req, res) => {
    res.render('users/index', { users });
  });
  
  app.get('/users/:userId', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.userId));
    if (user) {
      res.render('users/show', { user });
    } else {
      res.status(404).send('User not found');
    }
  });
  
// Маршрути для статей (EJS)
app.get('/articles', (req, res) => {
  res.render('articles/index.ejs', { articles });
  });
  
app.get('/articles/:articleId', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.articleId));
  if (article) {
    res.render('articles/show.ejs', { article });
  } else {
    res.status(404).send('Article not found');
  }
});
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
