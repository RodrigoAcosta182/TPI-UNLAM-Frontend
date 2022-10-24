// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import { Subject } from "rxjs";
// const connection = new HubConnectionBuilder()
//   .withUrl("https://localhost:44392/message")
//   .configureLogging(LogLevel.Information)
//   .build();

// export async function startHubConnection() {
//   try {
//     const subject = new Subject();
//     subject.subscribe((message) => {
//       console.log(message);
//     });

//     await connection.start();
//     console.log("SignalR Connected.");
//     connection.on("sendMessage", (message) => {
//       subject.next(message);
//     });
//   } catch (err) {
//     console.log(err);
//     //   setTimeout(startHubConnection, 5000);
//   }
//   return false;
// }
// connection.onclose(async () => {
//   await startHubConnection();
// });
