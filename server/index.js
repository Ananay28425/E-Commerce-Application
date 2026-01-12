import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.get("/", (req, res) => {
  res.send("Ecommerce Server is running");
});

app.listen( 5500, () => {
  console.log("Server is running on port 5500");
})

function getName(){
  return "Ecommerce Server";
}

const getNameAgain = () => {
  return "Ecommerce Server Again";
}