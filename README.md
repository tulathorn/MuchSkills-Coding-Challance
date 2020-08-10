# MuchSkills-Coding-Challance

This repository is belong to the MuchSkills Coding Challance. You can see the task description [here](https://gitlab.com/muchskills/coding-challenge).

## Step of setup

1. Clone the project
2. Start the database first. I run the database in the Docker, so you can start the database by `docker-compose up`
3. Start the backend by navigate to `./backend` then:

```bash
yarn
```

When the `yarn` command done, start the backend server by

```bash
node apo.js
```

4. Open another terminal, navigate to `./frontend` then feching module by `yarn` command.
5. Once step 5 done, start the frontend by `yarn dev`

## List of the thing that I think it should be improve

Since I was not written any code for a while and the limited time sloth. Here is the list of point that I would like to be improve if possible.

### 1. Binding the edit form with the fetch data

Now, I need to seperate the data view and the edit form. I face a renderling problem which make me decided to seperate it.

### 2. Seperate some part of code in page to be a share component.

In this project, you can clearly see that the form in add and edit page are duplicated. The code will be more clean if I seperate the form into the component. The reason that I do not make a form component because I afaraid it will have an issue with the react hook. I have a seldom knowleage on react hook and react context api, to be honest.

### 3. Introduce the unit-test in backend and frontend

At present, the test might not be very important because this project is kind of Prove of Concept, projetc. However, if this project exist the prototype phase. The test is nessesery in order to maintain the quality of product.

---

I hope that I will have a chance to work with MuchSkill.
