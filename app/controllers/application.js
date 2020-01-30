/* eslint-disable ember/no-side-effects */
import Controller from '@ember/controller';
import { computed } from "@ember/object";

export default Controller.extend({
  init(){  
    this._super(...arguments);

    this.get('store').findRecord('user', 42).then(item => {
      if (item.darkMode) {
        // document.body.classList.add("darkMode");
      } else {
        // document.body.classList.remove("darkMode");
      }
    });
  },

  users: computed(function() {
    return this.get('store').findAll('user');
  }),

  selectedUser: computed('users.length', function() {
    return this.get('users').sortBy('selectedAt').reverse().objectAt(0);
  }),

  actions: {
    changeUser: function(user) {
      let now = new Date()
      this.set('currentUser', user);
      this.set('currentUser.selectedAt', now);
      this.get('currentUser').save();
      
      location.reload(); //refresh page
    },

    darking: function() {
      const enableDarkMode = () => {
        document.body.classList.add("darkMode");
        window.localStorage.setItem('darkMode', true);
        document.getElementById('thisGuy').src = 'assets/images/logo-black.png'
      };

      const disableDarkMode = () => {
        document.body.classList.remove("darkMode");
        window.localStorage.setItem('darkMode', false);
        document.getElementById('thisGuy').src = 'assets/images/logo-white.png'
      };

      let state = window.localStorage.getItem('darkMode');


      if (state !== true) {
        enableDarkMode();
        alert(state);
      } else {
        disableDarkMode();
        alert(state);
      }
      // document.body.classList.toggle("darkMode");
      // let check = document.getElementById('thisGuy').src;

      // if(check.indexOf('logo-black.png') != -1) {
      //   document.getElementById('thisGuy').src = 'assets/images/logo-white.png'
      // } else {
      //   document.getElementById('thisGuy').src = 'assets/images/logo-black.png'
      // }
    }
  }
});