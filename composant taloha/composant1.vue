<template>
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
  </template>