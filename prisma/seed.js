const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  //   const createdCustomer = await prisma.customer.create({
  //     data: {
  //       name: "Alice",
  //     },
  //   });

  //   console.log("Customer created", createdCustomer);

  //   // Add your code here
  //   const createdContact = await prisma.contact.create({
  //     data: {
  //       phone: "1234567",
  //       email: "alice@example.com",
  //     },
  //   });

  //   console.log("Contact created", createdContact);

  const createdCustomerAndContact = await prisma.customer.create({
    data: {
      name: "Alice",
      contact: {
        create: {
          phone: "987654",
          email: "alice@random.com",
        },
      },
    },
    include: {
      contact: true,
    },
  });
  console.log("Customer and Contact created", createdCustomerAndContact);

  //   const createdMovie = await prisma.movie.create({
  //     data: {
  //       title: "Everything Everywhere All At Once",
  //       runtimeMins: 120,
  //     },
  //   });
  //   console.log("Movie created", createdMovie);

  //   const createdScreening = await prisma.screening.create({
  //     data: {
  //       startsAt: new Date("August 31, 2022 18:00:00"),
  //     },
  //   });
  //   console.log("Screening created", createdScreening);

  const createdMovieAndScreening = await prisma.movie.create({
    data: {
      title: "Bullet Train",
      runtimeMins: 120,
      //   screening: {
      //     create: {
      //       startsAt: new Date("August 26, 2022 19:00:00"),
      //     },
      //   },
    },
  });
  console.log("Movie and Screening created", createdMovieAndScreening);

  const createdScreen = await prisma.screen.create({
    data: {
      number: 1,
    },
  });

  console.log("Screen created", createdScreen);

  const createdScreening = await prisma.screening.create({
    data: {
      startsAt: new Date("August 26, 2022 19:00:00"),
      movie: {
        connect: { id: 1 },
      },
      screen: {
        connect: { id: 1 },
      },
    },
  });
  console.log("Screen created", createdScreening);

  const createdTicket = await prisma.ticket.create({
    data: {
      customer: {
        connect: { id: 1 },
      },
      screening: {
        connect: { id: 1 },
      },
    },
  });
  console.log("Ticket created", createdTicket);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
