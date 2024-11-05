# Add Community GUIDE

GitHub allows you to contribute to our community base by adding new communities using git, and later submit them in a "pull request",making the entire process from submission to approval transparent and inclusive.
### Requirements:
- A GitHub account.
- Git setup (for simplicity, we recommend [GitHub Desktop](https://github.com/apps/desktop)).

Here’s a step-by-step guide to get started

### Preparation
1. **Fork the repo** : https://github.com/beastdao/pom_frontend/fork
2. **Clone the forked repository** into a local directory (your computer).
Using GitHub Desktop and following 3 steps:
- open Github Desktop app
- Go to File > Clone Repository
- Select your fork of pom_frontend from the list and click Clone to download it to your computer.
3. **Open project in a code editor** of your choice (e.g., [Pulsar](https://pulsar-edit.dev/download.html#regular-releases) )

Now you’re ready to add your community!

### Adding a New  Community
1. **Create a new community file** using template
- Navigate to `../src/community_base/communities/`
- Duplicate `template.json` and rename it with your community’s name, using dashes if the name has multiple words (e.g., `your-community-name.json`)
2. **Fill out the community template** with a relevant community info.
- Open the new JSON file you created and populate it with your community’s information.
- For inspiration, review existing files in the same folder.
3. **Update the community base index**
- Open `../src/community_base/community_base_index.ts`
- Import your new community JSON file at the end of the existing import statements:
`import your-community-name from './communities/your-community-name.json';`
- Add your community to the end of list of exported communities:
`export const communities: Community[] = [beastdao, eth, pom, devcon, ethereum, your-community-name];`
4. **Commit your changes**
- Go to GitHub Desktop, you should see your changes listed.
- Write a commit message `ADD YOUR-COMMUNITY-NAME COMMUNITY` and click **Commit to main**.
- Push your changes by clicking Push origin.
5. **Submit your Community**
- Go to https://github.com/beastdao/pom_frontend
- Above the list of files, in the yellow banner, click **Compare & pull request** to create a pull request.
- type a title for your pull request in a following format `ADD YOUR-COMMUNITY-NAME COMMUNITY`
- click **Create Pull Request** and wait for review and approval from beast team
you can use this pull request as an example : [ADD ETHEREUM COMMUNITY](https://github.com/beastdao/pom_frontend/pull/59 )

As your pull request will be accepted and merged,  your community will be listed in https://app.pom.cards/communitybase
**Congrats, you made it!**
