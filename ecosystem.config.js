module.exports = {
  apps: [{
    name: 'synvo-docs',
    script: 'npm',
    args: 'start',
    cwd: '/home/jkyang/kai/eta-docs',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
