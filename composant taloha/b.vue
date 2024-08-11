<template>
    <div id="app" class="h-100">
    <div class="container-fluid h-100">
    <div class="row h-100">
    <div class="col-md-3 vue-bg h-100 d-flex
    justify-content-center align-items-center">
    <img alt="Vue logo" src="./image/logo48.png"
    width="100">
    </div>
    <div class="col-md-9 h-100 d-flex justifycontent-center align-items-center">
    <div class="col-md-8 rounded px-5 py-4
    shadow bg-white text-left">
    <form id="signup-form">
    <div class="row">
    <div class="col-12 form-group">
    <label class="col-form-label col-formlabel-lg">Full Name <span class="textdanger">*</span></label>
    <input type="text" class="form-control form-control-lg">
    <div class="invalid-feedback"></div>
    </div>
    <div class="col-12 form-group">
    <label class="col-form-label col-formlabel-lg">Email <span class="textdanger">*</span></label>
    <input type="email" class="form-control form-control-lg">
    <div class="invalid-feedback">The email field is
    required.</div>
    <div class="invalid-feedback">The email is not
    valid.</div>
    </div>
    <div class="col-12 form-group">
    <label class="col-form-label col-formlabel-lg">Country <span class="textdanger">*</span></label>
    <select class="form-control
    form-control-lg">
    <option value="">Select
    Country</option>
    </select>
    <div>The country field is
    required.</div>
    </div>
    <div class="col-12 form-group">
    <label class="col-form-label col-formlabel-lg">Password <span class="textdanger">*</span></label>
    <input type="password" class="form-control form-control-lg">
    <div class="invalid-feedback">The password field is required.</div>
    <div
    class="invalid-feedback">You must have at least</div>
    <div>You must not hav</div>
    </div>
    <div class="col-12 form-group textcenter">
    <button class="btn btn-vue btn-lg col-
    4">Sign Up</button>
    </div>
    </div>
    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </template>
  <script>
  export default{
    name:"Menu"
    }
  </script>
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    }
    .vue-bg {
    background: #bce5d0;
    width:200px;
    }
    img{
      border:1px solid black;
    }
    </style>