#!/usr/bin/env node
import { Command } from 'commander';
import { IntentBridgeAgent } from '@intent-bridge/core';
import * as dotenv from 'dotenv';

dotenv.config();

const program = new Command();

program
  .name('intent-bridge')
  .description('CLI to run the autonomous IntentBridge Agent')
  .version('1.0.0');

program
  .command('start')
  .description('Start the autonomous agent loop')
  .option('-r, --rpc <url>', 'RPC URL for EVM chain operations', process.env.RPC_URL || 'http://localhost:8545')
  .option('-p, --private-key <key>', 'Private key of the agent', process.env.PRIVATE_KEY)
  .option('-m, --max-risk <score>', 'Maximum risk score to accept a route (0-100)', '50')
  .action((options) => {
      if (!options.privateKey) {
          console.error('Error: Private key is required. Pass via --private-key or set PRIVATE_KEY in env.');
          process.exit(1);
      }

      console.log('Initializing IntentBridge Agent...');
      const agent = new IntentBridgeAgent({
          rpcUrl: options.rpc,
          privateKey: options.privateKey
      }, parseInt(options.maxRisk));

      agent.start();
      
      process.on('SIGINT', () => {
          console.log('\nGracefully shutting down agent...');
          agent.stop();
          process.exit(0);
      });
  });

program.parse();
