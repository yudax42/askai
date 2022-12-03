# askai

A command-line interface for OpenAI ChatGPT.

- 💬 Ask questions and chat with OpenAI ChatGPT
- 💻 Use from the command-line, no need for a web browser
- 💬 Live chat mode for real-time conversation with the model
- 🤖 Interact with the model using natural language

## Installation

To install `askai`, run the following command:

```
npm i askai -g
```

This will install the `askai` package globally on your system, allowing you to use it from any directory.

## Usage

To see a list of the available commands for `askai`, run the following command:

```
    askai --help
```

This will display a list of the available commands, along with their usage instructions.

To use `askai`, you will need to login to your ChatGPT account. To do so, run the following command:

```
    askai login
```

This will open a headless Chromium browser, where you can login to your ChatGPT account. Once you are logged in, you can use `askai` to ask questions and start live chat sessions.

To ask a question, run the following command:

```
    askai <question>
```

This will send your question to ChatGPT, and the model will respond with an answer.

To start a live chat session, run the following command:

```
    askai live
```

This will start a live chat session with ChatGPT. You can ask questions and the model will respond in real-time.

## How to contribute

Here are some ways you can contribute to `askai`:

- **Report bugs**: If you find a bug or issue with `askai`, please report it on the [issue tracker](https://github.com/yudax42/askai/issues). Be sure to include detailed instructions on how to reproduce the problem, as well as any error messages or log output.
- **Suggest new features**: Do you have an idea for a new feature or enhancement for `askai`? Please open an [issue](https://github.com/yudax42/askai/issues) to discuss it.
- **Write code**: If you are a developer, you can contribute directly to the `askai` codebase. To do so, please fork the [`askai` repository](https://github.com/yudax42/askai) on GitHub, make your changes, and then submit a pull request. Please be sure to include detailed documentation for your changes.
- **Improve the documentation**: Is something unclear or confusing in the `askai` documentation? Do you see any typos or mistakes? You can help improve the documentation by opening a pull request on the [`askai` repository](https://github.com/yudax42/askai) with your changes.

## How it works

`askai` uses the [Puppeteer](https://github.com/puppeteer/puppeteer) library to open a headless Chromium browser and interact with the ChatGPT website. When you run the `askai login` command, the browser will open and you can login to your ChatGPT account. Once you are logged in, `askai` can use the browser to send and receive messages from the ChatGPT model.

For more details on how `askai` works, please see the source code on [GitHub](https://github.com/yudax42/askai).

# Author

`askai` was created and is maintained by [Yudax](https://twitter.com/_yudax).

If you would like to support me, you can buy me a coffee on [Ko-Fi](https://ko-fi.com/yudax).
