<template>
    <form style="padding: 100px;">
    <div class="input-group" style="width: 500px;">
      <font-awesome-icon icon="user" style="margin-top: 10px;"/>&nbsp;
      <input id="email" type="email" class="form-control" name="email" placeholder="Email">
    </div>
    <div class="input-group" style="width: 500px;">
      <font-awesome-icon icon="lock" style="margin-top: 10px;"/>&nbsp;
      <input id="password" type="password" class="form-control" name="password" placeholder="Password">
    </div>
    
    <div class="row">
        
        <div class="col-sm-4" style="border:1px solid black">
          <div class="form-group">
            <label for=""> First Name:</label><input class="form-control" placeholder="Enter first name" type="text">
          </div>
        </div>
  
        <div class="col-sm-4" style="border:1px solid black">
          <div class="form-group">
            <label for=""> Last Name:</label><input class="form-control" placeholder="Enter first name" type="text">
          </div>
        </div>
  
        <div class="col-sm-4" style="border:1px solid black">
          <div class="form-group">
            <label for=""> Numero telephone:</label><input class="form-control" placeholder="Enter first name" type="text">
          </div>
        </div>
      
      </div>
  
  
  
  
  </form>
  </template>
  <script>
  export default{
    name:"Menu"
    }
  </script>
  <style>
  </style>