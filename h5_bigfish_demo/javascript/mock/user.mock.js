const data = [
  {
    key: '1',
    name: 'lily',
    age: 19,
    like: 'apple',
  },
  {
    key: '2',
    name: 'lucy',
    age: 18,
    like: 'orange',
  },
];

export default {
  '/api/user': (req, res) => {
    const ret = data.find(item => item.key === req.query.id);
    setTimeout(() => {
      res.send({
        code: 200,
        message: 'success',
        data: ret
      });
    }, 1000);
  },
};
