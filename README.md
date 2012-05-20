# Server Push Example

This example runs only on the *unstable 0.7 series*. It also requires that you install node-spdy from a git brach.

To install node-spdy, run the following in a separate directory:

    git clone git://github.com/indutny/node-spdy.git
    git co spdy-v3
    npm link

Now, install the packages required, including the local node-spdy:

    npm link spdy
    npm install --force

Finally, run the app like normal:

    node app
