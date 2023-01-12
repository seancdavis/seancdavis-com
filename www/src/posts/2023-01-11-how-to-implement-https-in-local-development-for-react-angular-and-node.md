---
title: How to implement HTTPS in local development for React, Angular, and Node
description: >-
  Using an SSL certificate can be beneficial in local development, especially
  when communicating with external services.
tags:
  - angular
  - node
  - react
  - security
  - contributor:daniel-williams
author: daniel-williams
image: >-
  /posts/230111/how-to-implement-https-in-local-development-for-react-angular-and-node-3RkRobvF.png
seo:
  image: >-
    /posts/230111/how-to-implement-https-in-local-development-for-react-angular-and-node-HAbxoD34--meta.png
---

{% post_image alt="", src="/uploads/230111/image1.png" %}

Cybersecurity is key to enhanced customer experience in the modern era of digitization. More than half of the world's population is on the internet; you must ensure a secure customer experience. However, it becomes crucial for developers to develop software in the same environment for deployment and development. So, using HTTPS in local development becomes essential as you may have the same protocol in the deployment environment.

Hypertext transfer protocol secure (HTTPS) is a secure version of the protocol used between browsers and websites to transfer data. Website developers can use an [SSL certificate](https://www.ssl2buy.com/) to implement HTTPS. Therefore, while developing a website or application, SSL certificate is a key to your development. It helps in ensuring a secure experience for users.

SSL certificates are encryption-based certificates that secure the communication between a browser and a server. We will discuss why we use HTTPS, how to implement it, and get a certificate. First, let us understand the need for HTTPS in developing apps locally on JavaScript-based frameworks like React, Angular, and Node.

## Why HTTPS is Beneficial in Local Development

{% post_image alt="", src="/uploads/230111/image3.png" %}

Implementing HTTPS in local development for React, Angular, and Node provides an added layer of security. It encrypts every communication between your computer and the server. This prevents third-party access to your data and makes it harder for attackers to steal information or inject malicious code into your applications.

Using HTTPS for local development helps ensure that your users have a positive experience when browsing your application in their browser. By providing an encrypted connection between the user's computer and the server, you protect against session hijacking attacks. It is an attack where an attacker steals information from a user's web browser while logged in.

When you implement HTTPS in local development for React**,** Angular, and Node there are several benefits:

- Encrypts every communication between your computer and the server
- Prevents third-party access to your data
- Makes it more challenging for attackers to steal information or inject malicious code into your application
- Provides a secure connection between the user's computer and the server, preventing session hijacking attacks
- When used in conjunction with a build automation system such as Webpack, HTTPS ensures that all of your code is compiled and packaged securely.
- Helps keep your applications up and running during unexpected traffic spikes

Now that we know the benefits of using HTTPS for local development, let us understand the process of implementing it.

### Obtaining an SSL Certificate

{% post_image alt="", src="/uploads/230111/I-0SWcbPAvH8lJTNAfKj1-rKR3l6ikjL-ixBfnfBvvnmlP_zmiXjm7NE3nd4buJNDwjG64itSaxbpKK0L1grpXhIf9Ab3fALAfTLjYatydWkv7u79AOVc-fSiSIeNa_uE_G4LQFax8-syLpfoVf2jMMCHdlIjKg4-0QfSifroE3XI0JKJLAhZ-ZWVzho6eV0" %}

Implementing HTTPS begins with the generation of a Certificate Signing Request to a trustworthy CA.

First, submit a CSR-certificate signing request and essential information regarding your organization to [Certificate Authority](https://www.ssl2buy.com/wiki/what-is-certificate-authority-ca) (CA) to get an SSL certificate. A CA is responsible for issuing and managing certificates on behalf of websites. There are many reputable CAs available, so it is worth doing some research before selecting one.

Once you have signed up with a CA, they will send you some information. The first is a certificate request (CSR) step and configuration process. You will need to complete this form and send it back to the CA.

You can obtain an SSL certificate from your chosen CA. Once all the required information and CSR have been submitted, CA will validate your information, and after a thorough vetting process, it will issue a certificate.

## **SSL Setup for a React App**

Find the root directory of create-react-app and run the following commands:

```txt
# Create .cert directory if it doesn't exist
mydir -p .cert

# Generate the certificate (ran from the root of this project)
cert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```

Further, update the start script again for the application by running the following command:

`package.json` {.filename}

```json
{
	"scripts": {
		"start": "HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start",
		"build": "react-scripts build",
		"test": "react-scripts test",
		"eject": "react-scripts eject"
	},
	// ...
},
```

Now when you run the `start` script again, you will notice a secure connection.

## **SSL Setup for an Angular App**

For setting up an SSL certificate in Angular, you can use `--ssl`, `--ssl-key`, and `--ssl-cert` together with `ng serve`. For the setup, first, you need to define `--ssl-key` and `--ssl-cert` environment variables.

```txt
ng serve -o -ssl true --sslKey {KEY_PATH} --sslCert {CERT_PATH}
```

Now set the command for the npm start script.

`package.json` {.filename}

```json
{
	"scripts": {
		"start": "ng serve --ssl true --ssl-key {KEY-PATH} --ssl-cert {CERT-PATH}"
	},
	// ...
},
```

Your Angular app'sapp's local development is now secure from cyberattacks.

## **SSL Setup for the Back End**

The back-end development process is the software engineering process of creating a platform-independent web application back end. Backend developers design and build systems that underlie websites or other applications by interfacing with databases, networks, and other business communications tools.

Node.js is a perfect platform to develop backend applications as it has low-level networking capabilities and can handle large amounts of data quickly. Node.js also supports an event-driven model, which makes it easy to implement real-time features in your backend systems.

### **SSL Setup for Node.js**

Set up an SSL certificate for your local development by installing it on the Node.js server. First, you will need a CA bundle file, domain file, private key, and root certificate. Once you have all the required files, create an HTTPS server in the Node.js environment by running the following command:

`https_server.js` {.filename}

```js
var https = require("https");
var fs = require("fs");

var https_options = {
  key: fs.readFileSync("/path/to/private.key"),
  cert: fs.readFileSync("/path/to/your_domain_name.crt"),
  ca: [
    fs.readFileSync("path/to/CA_root.crt"),
    fs.readFileSync("path/to/ca_bundle_certificate.crt"),
  ],
};

https
  .createServer(https_options, function (req, res) {
    res.writeHead(200);
    res.end("Welcome to Node.js HTTPS Servern");
  })
  .listen(8443);
```

Now simply change the file path to the source where your files are stored and activate the SSL certificate \*\*\*\* by running the following command:

```txt
node https_server.js
```

## Work Safe Locally

Cybersecurity is crucial to businesses, and so you need to secure the development process also because it will protect your websites at an early stage. Especially during the development and testing phases when your software is not ready for launch, an SSL certificate provides security against malware, Man-in-The-Middle attacks. So, find the right CA and start securing your app's local development.
