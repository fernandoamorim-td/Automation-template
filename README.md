# Playwright template for CCP

Hi there! 

This project, as the name says, is a template-project to be used to start a test's project using Playwright. 
It can be used for example for UI tests or API tests and it has the stater basis for any of them.

## How to use it
Please do not change the current project unless the purpose is to improve it as a template.  
So, if you want to use it as a template for your own project, clone it and then create a new project.  
As asked from Security, please, do not fork this project as well.

## How to configure an account before trying to run it
Firstly, you to configure an account to run the tests
For the current Template you need to have an account and export the following environment variables:
```script
 export NODE_ENV=<account-name>
 export USER_EMAIL_<account-name>=<account-email>
 export USER_PASSWORD_<account-name>=<account-password>
 export CLIENT_ID_<account-name>=<client-id>
 export CLIENT_SECRET__<account-name>=<client-secret>
```

## How to run it
Running tests with NPM
```script
# Run all tests
npm run all
```

For more instructions, please read the Readme template given below, under the section "Running locally"


## Guidelines 
If the tests are up, running and passing, you are ready to start using it.

Please read the following guidelines so you'll create an awesome and well-structured tests' project. 

### 101 Structure explained

  - **Scenarios:**
    - the `*.spec.js` classes are the ones where the actual scenarios are allocated. They are identified by the key word `test`. Ideally, there is no logic in here.
    - the `*-steps.js` classes are where the steps for the scenarios should be. The steps include the logic for the scenario's flows, added in the functions that include the `test.step()` methods.


  - **Page-objects:**
    - the `*-page.js` classes are where the elements needed to be manipulated are, as well the respective locators. Any manipulation that needs be done goes here as well. 
    - sometimes locators may vary between environments (or other condition). This problem can be handled by using a factory, where the right page-object is instantiated.


  - **API**
    - in gateway package are the classes with the tests' requests related are built.
    - in clients package are the classes with the client's requests related are built.
    - listeners are used to intercept BE responses, so we can get BE information that's not available in the UI. Read about it [here](https://playwright.dev/docs/events#addingremoving-event-listener)


  - **Setup and Support**
    - the `playwright.config.js` is where the configs for playwright framework are.
    - `global-setup.js` is called at `playwright.config.js` under `globalSetup` parameter. This class will be executed before any test start. Is useful specially to build sessions needed and gain time on the execution.
    - `custom-fixtures.js` class include the sessions that are needed for each test. (Test fixtures are used to establish environment for each test, giving the test everything it needs and nothing else).
    - `configuration-helper.js` class includes the environment variables needed.
      
 For specific doubts about Playwright framework, please read [the documentation](https://playwright.dev/docs/intro).  
 Additionally, for doubts about design patterns, [checkout this page](https://refactoring.guru/design-patterns)



### Allure Report

The project integrates Allure framework.
Allure will automatically identify the scenarios and tests respectively.   
They must be correctly identified by the methods/keywords `test()` and `test.step()` under the `*.spec.js` and `*-steps.js` classes.

After running the tests, you can generate the report using the command:
```script
npm run allure
```
The report will open automatically, but will appear under the package `allure-report` as well.  
The evidences created by allure will appear under the package `allure-results`.


For specific doubts about Allure framework, please read [the documentation](https://docs.qameta.io/allure/)


## Where to start on using this template

1. Configure the accounts that you know that you'll need, you can see an example at `.env.routing-auto1-qaca`
2. Do a quick search for the word ''template''. You'll see that, besides the readme.md, it appears in some other classes.
   In those places it represents examples, so you should either replace it for your project name or adapt or delete the example,
   so it matches your needs.
    - Pay close atention to these Classes:
        - `docker-compose.yml`
        - `kci-pipeline.ymal`
        - `Jenkinsfile`
        - `pipeline-runner.sh`
        - `wiremock-client.js`
        - `.env`
3. Adapt/delete code that you do not need.
4. Edit this `README` file so it's specific to your project. You'll also find a template for it right bellow this section.
5. Start testing!


For further doubts, please reach out to [ccp-qa team](https://talkdesk.atlassian.net/wiki/spaces/CCPQ/pages/3830613098/Team+homepage) 😊

---

## This is a README template
Please adapt 'Specific section' for your specific project

---

# Template End-to-end Tests

## Requirements

- Node JS 16+
- Allure (for test reports)

## Running locally
Firstly, configure the account to run the tests
```script
 export NODE_ENV=<account-name>
```

Running tests with NPM
```script
# Run all tests
npm run all

# Filtering Tests with Tag @debug
npm run debug
``` 

After that, when you run tests you can generate the report using the command:
```script
npm run allure
``` 

You can also check the trace of the execution, using the command:
```script
npx playwright show-trace
``` 

It will open the trace application and you can open the trace file you've downloaded on the allure report.

To execute linter
```script
npm run eslint 
```

Running dockerized version (as Jenkins)
```script
./pipeline-runner.sh <account-name> <service-name>
```

##Specific section -- delete this title

## Tags

Each test should have tags related to the environment and also the region where it should run as the following example.

```text
"Hello world test @qa @prd @us @eu @ca"
```

The generic tags available are:

```text
@qa - @prd - @us - @eu - @ca - @fire-drill - @componet-X
```
### Environment tags

- *@qa*: Tests with this tag will run in our QA Regression that is executed in a daily basis. This tag should be added to all tests

- *@prd*: Tests with this tag will run agains our PRD environment for each region (below tags). Only tests that are part of our Critical Path should have this tag. In some cases where the component is not part of our Critical Path, we should add this tag to the critical scenarios. E.g: *Admin - Email Admin Touchpoint Journey* -> We need to execute this Journey since it tests the email touchpoint connection creation and connection.   

### Regional tags

- *@us*: Tests with this tag will be executed using an account for the US region (QA or PRD)

- *@eu*: Tests with this tag will be executed using an account for the EU region (only PRD)

- *@ca*: Tests with this tag will be executed using an account for the CA region (only PRD)

For Regions different from US the idea is to run tests that affects all our integratons (e.g: Twilio, Nylas,...), Beucause of that we're running only few tests comparing them with US. It's not a regression test. s

### Components Pipeline tags

It's also possible to tag a test to run in each component pipeline for that you need to only add one of the available tags below

- *@template-tag*: Tests will run in TEMPLATE pipeline 

All tests with a component tag and *@qa* is going to run run after this component deployment to QA. The same will happen with *@prd* tag and the PRD environment.  



## Jenkins Executions

This project is available to run in our [Jenkins](link) in our Daily Execution, Pull Requests and Fire Drills

> All Jenkins executions will use the last Main version, and in the KCI Pipeline file, you can find which account is being used by the daily run.
### Daily 

Currently, our tests are running daily on Jenkins per Environment-Region in the follwoing Jobs:

- [QA-US](link)
- [PRD-US](link) 
- [PRD-EU](link)
- [PRD-CA](link)

### Activate Playwright Trace
We can activate/deactivate trace by a KCI configuration, we added a new MEZA variable for that:

-  "PLAYRIWGHT_ACTIVATE_TRACE_<branch_name>": "true"

If you need to activate trace on your branch(branch name is <enable-playwright-trace>), you can add a variable in MEZA and docker-compose file:

"PLAYRIWGHT_ACTIVATE_TRACE_<enable_playwright_trace>": "true"

### Parallel Execution
To reduce the smoke tests execution duration, we are executing our spec files in parallel (by default, using 5 workers), we added a new MEZA variable for that:

-  "ACTIVATE_PARALLEL_WORKERS": "true"

Each spec file represents one channel that will use one agent. For example, we have XXXX spec files with XXX different agents, (don't forget to have all the users and passwords in your bash profile) :
- TEMPLATE Agent
- TEMPLATE Agent
- TEMPLATE User

The credentials and all the information regarding Agents access can be obtain with QA Team.

### Pull Requests  

After creating a PR the all with PRD or QA tags are going to be executed using for the respective environments

The accounts used for PRs are: 
    - PRD: 
    - QA: routing-auto1-qaus

### Fire drill

Before:
Go to MEZA CI configs (EDITOR=nano td ci:edit -a TEMPLATE) and change the "ACTIVATE_RETRY" to false.

After:
Go to MEZA CI configs (EDITOR=nano td ci:edit -a TEMPLATE) and change the "ACTIVATE_RETRY" to true again.

### :warning: Important Topics :warning:

#### Contributing and Keeping Main branch stable 
Since the Main branch is being used to run our daily executions, we should be extra careful with versions that don't work properly for our automated accounts and because of that, all PRs execute tests against QA and PRD environment and both need to pass to allow us to merge on GitHub.  
However, our current structure doesn't allow us to run tests with different accounts for PRs and this can cause failures in case of more the one PRs running together.  
So before opening a new PR please sync with the QA Team to verify if there is another PR running at that moment.  

#### Credentials on Jenkins

In our CI environment the credentials are configured as MEZA CI configs. To change this configurations or add others you need to have access and change it on td-cli

```shell script
EDITOR=nano td ci:edit -a TEMPLATE
```
#### Daily Git Branches Update
If you change anything in the Docker Compose file or KCI.yaml, remember to update our daily branches after merging your code with the Main branch. For that, you need to execute the following command line:

```shell script
./scripts/update-jenkins-executions.sh
```

If you need to create another Jenkins Job (branches), you should update this file accordingly
