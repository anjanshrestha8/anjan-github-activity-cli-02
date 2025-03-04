#!/usr/bin/env node

import { program } from "commander";
import { API_USERS } from "./constants.js";
import { get, getEvents } from "./services.js";

console.log("GitHub Activity");

program
  .version("2.0.0")
  .description("This is a CLI to get git hub user activity");

const displayGithubActivity = async (username) => {
  username = username.trim();

  if (!username) {
    console.log("Please provide a github username.");
  }

  const apiUrl = `${API_USERS}/${username}/events`;

  console.log(`Fetching ${username}'s activity......`);

  const data = await get(apiUrl, username);

  console.log(`Hey, ${username}! Here are your recent activities on GitHub:`);

  data?.map((activity) => {
    const { message } = getEvents(activity);

    if (message) {
      console.log(`- ${message}`);
    }
  });
};
program.argument("<username>").action(displayGithubActivity);

program.parse(process.argv);
