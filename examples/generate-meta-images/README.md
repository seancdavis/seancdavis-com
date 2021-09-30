# Post Meta Image Generator

This project represents an example of how you can read markdown files in a directory and render corresponding meta images for each one, saving the filename reference back to the file.

## Setup

To get setup, first install dependencies:

    npm install

Then check the values in `config.js` and set them to your desired settings. Note: If you'd like to change the directories used for posts and images, you'll have to create the directories manually.

## Usage

To generate a set of random markdown files:

    npm run generate:files

Once files are in place, you can generate images for files:

    npm run generate:images

Note that images won't be generated if an `image` reference already exists in the markdown file.

## License

This falls under the license of the seancdavis-com project. See the license file in the monorepo root for more information.
