// namespace
var app = app || {};
var active = active || {};

app.addRecipeView = Backbone.View.extend({
  el: $('#add-recipe'),
  initialize: function() {
    console.log("addRecipeView instantiated");
    // this.$el.children('button').hide();
    this.$el.children('button').prop('disabled', false);
  },
  events: {
    'click button': 'addRecipe',
    'blur input': 'validateInput'
  },
  addRecipe: function() {
    var confirmation = confirm('Are you sure you want to add this recipe?');
    if (confirmation) {
      var data = {
        ingredients: $('#recipe-ingredients').val(),
        type: $('#recipe-type').val(),
        syrup: $('#recipe-topping').val(),
        topping: $('#recipe-syrup').val(),
        instructions: $('#recipe-instructions').val(),
        time: $('#recipe-time').val()
      }
      console.log(data);
      this.collection.create(data);
    }
  },
  validateInput: function() {
    var allTheInputs = this.$el.children('input');
    console.log(allTheInputs);
    var validValues = 0;

    for (var i = 0; i < allTheInputs.length; i++) {
      var selector = $(allTheInputs)[i];
      //console.log(selector);
      var val = $(selector).val();
      if (val.length > 0) {
        validValues++;
      }
    }

    if (validValues != allTheInputs.length) {
      // this.$el.children('button').hide();
      this.$el.children('button').prop('disabled', true);
      this.$el.children('.error').html('Some fields are empty');
    } else {
      // this.$el.children('button').show();
      this.$el.children('button').prop('disabled', false);
      this.$el.children('.error').html('');
    }

  }
});


app.CollectionView = Backbone.View.extend({
  el: $('#pancake-listing'),
  initialize: function() {
    console.log('CollectionView is a go.');
    // when loaded, render immediately
    this.render();
  },
  render: function() {
    console.log('CollectionView is rendering');
    // we expect the CollectionView to be bound to a Collection
    var models = this.collection.models;
    for (var m in models) {
       new app.ModelView({
         model: models[m],
         el: this.el
       });
    }
  }
});

app.ModelView = Backbone.View.extend({
  initialize: function() {
    console.log("ModelView instantiated");
    this.render();
  },
  render: function() {
    console.log('ModelView rendering');
    var data = this.model.attributes;
    console.log('Grabbing template...');
    var template = $('#recipe-template').html();
    console.log('Transforming template...');
    var compileTpl = _.template(template);
    console.log('Creating HTML from template and model data...');
    var html = compileTpl(data);
    console.log('Rendering to page...');
    this.$el.append(html);
    // vanialla - this.el.innerHTML = this.el.innerHTML + html;
  }
});
