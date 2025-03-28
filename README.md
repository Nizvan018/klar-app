# Klar Clon with React Native 📱⚛️

<div align="center">
  <br />
  <strong>This is a Klar Clon made with Expo and React Native (that does not allow to banking operations of course)</strong>
</div>

![Mobile Screenshot](https://github.com/user-attachments/assets/3d1eeba7-cff8-4e6b-a08c-b224c7cecad5)

<div align="center">
  
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  
</div>
<br />

<p align="center">
  Do you love it?, <strong>Please give me a star! 🌟</strong>
</p>
<br />

## What is this about? 🤔

<br />

This is a project aimed at cloning the banking mobile application Klar for educational purposes and to practice my skills with React Native. It's important to highlight that no type of banking transactions can be made, at this was never its intention.

The application allows users to add contacts, simulate bank transfers, deposits, and investments with interest rates, all using Expo, React Native and Firebase as the database.

Feel free to download the project, explore its functionality, and use it for practice or other educational purposes.

<br />

## ✨ Getting started

1. Clone this repository
2. Install the dependencies:
```sh
npm i
```
3. Execute the project:
```sh
npm run start
```
4. Create and configure a project in Firebase (database and authentication)
5. Add the corresponding api keys in the project
6. And you are ready for coding!

<br />
<p align="center">
  <strong>¡As simple as that!</strong>
</p>
<br />

## ⚙️ Project structure

When you open the project, you'll find something like this:

```text
/
├── assets/
│   ├── images/
│   └── styles/
├── src/
│   ├── api/
│   │   ├── account.ts
│   │   ├── auth.ts
│   │   ├── investments.ts
│   │   ├── recipients.ts
│   │   └── transfers.ts
│   ├── components/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── navigation/
│   │   ├── GeneralStack.tsx
│   │   ├── GeneralTabs.tsx
│   │   ├── HomeStack.tsx
│   │   └── Navigation.tsx
│   ├── screens/
│   └── types/
└── package.json
```

<br />
Here are the datails of the structure:

| Section                   | Description                                                                 |
| :------------------------ | :-------------------------------------------------------------------------- |
| `assets/`                 | Stores the images and the styles of the app                                 |
| `src/api/`                | Contains the API routes of the app                                          |
| `src/components/`         | Contains all the components used in the screens                             |
| `src/context/`            | Contains `AuthContext.tsx`, the fiel that manage the context of the session |
| `src/navigation/`         | Contains the components that are realted with the navigation of the app     |
| `src/screens/`            | Contains all the screens of the app                                         |
| `src/types/`              | Here you will find the definitions of the types                             |

<br />

## 📸 Screenshots

<div align="center">
  
![Mobile Screenshot](https://github.com/user-attachments/assets/13e151c4-0bfe-4b67-a969-3f8fcd6188de)

https://github.com/user-attachments/assets/ab7bb45e-8f3a-48f1-ad2a-f9d388f4c150
  
</div>


## 💾 Dependencies used

The most important dependencies are listed here:

* [Expo 51](https://expo.dev)
* [React Native 0.74](https://reactnative.dev)
* [React 18](https://es.react.dev)
* [Firebase 10](https://firebase.google.com)
* [@react-navigation 6](https://reactnavigation.org)

## 🤝 How to contribute

This project is open source, so feel free to clone it, edit it and use it for educational porposes.

If you have any suggestion or improvement, you can contribute to this project in the following way:

1. Fork this project
2. Clone your fork with:
```sh
git clone <URL of your fork>`
```
3. Add the original repository as remote:
```sh
git remote add upstream <URL of the original repo>
```
4. Create your branch, make your changes and make a push them to your branch
5. Open a Pull Request (PR)

**Ensure that your commits are clean and descriptive**

## 🌟 If you love it, give me a star

If this project was helpful to you you or you liked it, please give me a star!, I would be very grateful! :D

See you coding 👋

## 💙 My social media

<p align="center">
  <a href="https://nizvan-dev.vercel.app"><img src="https://img.icons8.com/?size=50&id=9x65MLqCekT5&format=png&color=000000" alt="Website"/></a>
	<a href="mailto:nizvan.dev@gmail.com"><img src="https://img.icons8.com/?size=50&id=xLIkjgcmFOsC&format=png&color=000000" alt="Gmail"/></a>
	<a href="https://www.instagram.com/nizvan_dev/"><img src="https://img.icons8.com/?size=50&id=Xy10Jcu1L2Su&format=png&color=000000" alt="Instagram"/></a>
</p>

[contributors-shield]: https://img.shields.io/github/contributors/Nizvan018/klar-app.svg?style=for-the-badge
[contributors-url]: https://github.com/Nizvan018/klar-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Nizvan018/klar-app.svg?style=for-the-badge
[forks-url]: https://github.com/Nizvan018/klar-app/network/members
[stars-shield]: https://img.shields.io/github/stars/Nizvan018/klar-app.svg?style=for-the-badge
[stars-url]: https://github.com/Nizvan018/klar-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/Nizvan018/klar-app.svg?style=for-the-badge
[issues-url]: https://github.com/Nizvan018/klar-app/issues
