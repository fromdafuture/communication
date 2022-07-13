export default function () {
  let id = 0;

  return {
    events: [
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 11 2022 12:30"),
        timeEnd: new Date("July 11 2022 13:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "4",
        participants: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 11 2022 12:25"),
        timeEnd: new Date("July 11 2022 14:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "1",
        participants: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 11 2022 11:30"),
        timeEnd: new Date("July 11 2022 12:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "",
        participants: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 11 2022 12:00"),
        timeEnd: new Date("July 11 2022 13:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "",
        participants: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 12 2022 12:30"),
        timeEnd: new Date("July 12 2022 13:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "1",
        participants: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 13 2022 12:30"),
        timeEnd: new Date("July 13 2022 13:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "2",
        participants: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 14 2022 12:30"),
        timeEnd: new Date("July 14 2022 13:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "3",
        participants: [2, 3, 4, 5, 6, 1, 2, 3],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 14 2022 10:00"),
        timeEnd: new Date("July 14 2022 11:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "1",
        participants: [5, 6, 7, 8, 1, 2, 3, 4],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 15 2022 10:00"),
        timeEnd: new Date("July 15 2022 11:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "2",
        participants: [1, 2, 3],
      },
      {
        id: ++id,
        creationTime: Date.now(),
        timeStart: new Date("July 14 2022 1:30"),
        timeEnd: new Date("July 14 2022 2:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "3",
        participants: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: 123321,
        creationTime: Date.now(),
        timeStart: new Date("July 14 2022 1:20"),
        timeEnd: new Date("July 14 2022 2:30"),
        title: "Some event title Some event title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userCreated: "2",
        participants: [1, 2, 3, 4, 5, 6, 7, 8],
      },
    ],
    users: [
      {
        id: 1,
        name: "Ilon Mask",
        avatar: "/user-photos/user001.png",
      },
      {
        id: 2,
        name: "Ilon Mask",
        avatar: "",
      },
      {
        id: 3,
        name: "",
        avatar: "/user-photos/user003.png",
      },
      {
        id: 4,
        name: "Mask Ilon",
        avatar: "/user-photos/user004.png",
      },
      {
        id: 5,
        name: "Ilon Mask",
        avatar: "/user-photos/user005.png",
      },
      {
        id: 6,
        name: "Mask Ilon",
        avatar: "",
      },
      {
        id: 7,
        name: "Ilon Mask",
        avatar: "/user-photos/user007.png",
      },
      {
        id: 8,
        name: "Ilon Mask",
        avatar: "/user-photos/user008.png",
      },
    ],
  };
}
