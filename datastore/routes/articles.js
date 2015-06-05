var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET RSS articles listing. */
// TODO

/* UPDATE RSS article */

/* PUT RSS article */
router.post('/add', function(req, res) {
  q = 'INSERT INTO article VALUES (null, ?, ?, ?, ?, ?, ?)';
  conn.query(q,
             [req.body.rssfeed_id,
              req.body.url,
              req.body.title,
              req.body.published_date,
              req.body.summary,
              req.body.html],
    function(err, results, fields) {
      if (err) {
        throw err;
      }
      res.json(results);
    }
  )
});

/* DELETE article */
router.post('/remove', function(req, res) {
  q = 'DELETE FROM article WHERE id = ?';
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
