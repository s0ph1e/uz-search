// features/step_definitions/hooks.js
module.exports = function () {
  this.After(function() {
    return this.driver.quit();
  });
};