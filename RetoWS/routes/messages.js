var express = require('express');
var router = express.Router();
var Joi = require("joi");
var ws = require("../wslib")

const Message = require("../models/message")

const schema = Joi.object({
  message: Joi.string().required().min(5),
  author: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]+\s+[a-zA-Z]+$/, "author"),
});



router.get("/", (req, res) => {
  Message.findAll().then((result) => {
      res.send(result);
  });
});


/* GET users listing. */
router.get("/" + ":ts", (req, res) => {
  Message.findAll({
      where: {
          ts: req.params.ts
      }
  }).then((result) => {
      if (result.length < 1)
          return res
              .status(404)
              .send("The message with the given ts was not found");
      res.send(result[0]);
  });
});


router.post('/', (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  user = Message.create(req.body);
  res.send(user);
});

router.put('/' + ":ts", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  Message.update(req.body, { where: { ts: req.params.ts } }).then((val) => val ? res.status(200).send("Succes") : res.status(404)).send("Failed to delete msg");
});

router.delete('/' + ":ts", (req, res) => {
  Message.destroy({
      where: {
          ts: req.params.ts
      }
  }).then((val) => {
      val ? res.status(200).send("Succes") : res.status(404).send("Failed to delete msg");
      ws.sendMessages()  
  }
  );
});


module.exports = router;
