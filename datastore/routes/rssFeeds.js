var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET RSS feeds listing. */
router.get('/listall', function(req, res) {
  q = 'SELECT * FROM rssfeed ORDER BY id ASC';
  conn.query(q,
    function(err, results, fields) {
      if (err) {
        throw err;
      }
      res.json(results);
    }
  )
});

/* UPDATE RSS feed */
// TODO

/* PUT RSS feed */
router.post('/add', function(req, res) {
  q = 'INSERT INTO rssfeed VALUES (null, ?, ?)';
  conn.query(q, [req.body.name, req.body.url], 
    function(err, results, fields) {
      if (err) {
        throw err;
      }
      res.json(results);
    }
  )
});

/* DELETE feed */
router.post('/remove', function(req, res) {
  q = 'DELETE FROM rssfeed WHERE id = ?';
  conn.query(q, [req.body.id], 
    function(err, results, fields) {
      if (err) {
        throw err;
      }
      res.json(results);
    }
  )
});

module.exports = router;
