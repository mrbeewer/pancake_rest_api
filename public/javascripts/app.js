// namespace
var app = app || {};
var active = active || {};

// define 4 important parts
app.Model = Backbone.Model.extend({

});

Backbone.Model.idAttribute = "_id";

app.Collection = Backbone.Collection.extend({
  model: app.Model, // what type of models will the collection hold
  url: '/api',
  initialize: function() {
    var self = this;
    this.on('change', function() {
      console.log("Our collection has changed");
      var view = new app.CollectionView({
        collection: self
      });
    });
    this.on('sync', function() {
      console.log("Our collection synced with the API");
      var view = new app.CollectionView({
        collection: self
      });
    });
    // get data from API
    this.fetch();
  }
});





// mongoDB support!
Backbone.Model.idAttribute = "_id";

// http://backbonejs.org/#History-start
Backbone.history.start();

// document is ready
$(document).ready(function() {

  active.collection = new app.Collection();
  active.createRecipeView = new app.addRecipeView({
    collection: active.collection
  });

}); // END READY
