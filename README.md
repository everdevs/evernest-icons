# evernest-icons
- SVG icons for use in Evernest projects
- The package is [published on npm](https://www.npmjs.com/package/evernest-icons) 
- Supports sizes `16px`, `24px` and `40px`

## How to use

### Step 1 - Github
1. Create a new branch
2. Add the new icon file(s) to the `icons/in` folder with the name template `<name> <size>.svg`. 
   1. For example, if your file was a 16px SVG called `building.svg`, you would rename the file to `building 16px.svg` and place it into the `icons/in` folder. 
3. Run `yarn build`, which will automatically compress the new icons, adding them to `icons/out`, and update the types for the package.
4. Commit all of the changes to your branch.

### Step 2 - Release
1. Once the PR has been approved and merged to master, `git pull` on your local master
2. Log in to NPM using `npm login`
3. Run `yarn release`. This will create the tag and version commit.
4. Run `git push --follow-tags origin master && npm publish`, which will push the new tag & commit to master and publish the new package version on NPM.
