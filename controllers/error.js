exports.notFound = (req, res) => {
  res.status(404).render('error', {
    message: 'Page not found',
  });
};
