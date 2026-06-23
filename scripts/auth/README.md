# Trying out the SuperTokens auth without code

The three scripts in this directory interact with
[SuperToken's FDI](https://supertokens.com/docs/references/fdi/email-password/post-signin) to
create a user and a session associated with it.
The test script fetches a resource at `/protected`,
demonstrating SuperToken's auth system in action

To start, simply run the tech stack and wait for NGINX
to boot. Then, run the signup, login, and test scripts in
sequence
