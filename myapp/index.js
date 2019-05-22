#!/usr/bin/env node
import mongo from "./mongo"
import express from "./express"
import server from "./server"

mongo()
    .then(express)
    .then(server)
    .catch(console.error)
