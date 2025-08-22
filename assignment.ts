class TransactionFailedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TransactionFailedException Message";
  }
}

class User {
  id: number;
  name: string;
  balance: number;
  group: Group | null;

  constructor(id: number, name: string, balance: number = 0) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.group = null;
  }

  addCoins(amount: number) {
    this.balance += amount;
  }

  pay(toUser: User, amount: number) {
    if (!this.group || !toUser.group) {
      throw new TransactionFailedException(
        "Both users must belong to a group."
      );
    }

    if (this.group.id !== toUser.group.id) {
      throw new TransactionFailedException(
        `Payment failed: ${this.name} and ${toUser.name} are not in the same group.`
      );
    }

    //Because user can not send coins to group admin as we have talked about

    if (toUser === this.group.admin) {
      throw new TransactionFailedException(
        `Payment failed: ${this.name} cannot send coins to the group admin (${toUser.name}).`
      );
    }

    if (this.balance < amount) {
      throw new TransactionFailedException(
        `Payment failed: ${this.name} has insufficient balance.`
      );
    }

    this.balance -= amount;
    toUser.balance += amount;

    console.log(`${this.name} paid ${amount} coins to ${toUser.name}.`);
  }
}

class Admin extends User {
  constructor(id: number, name: string, balance: number = 0) {
    super(id, name, balance);
  }

  distributeCoins(amountPerUser: number) {
    if (!this.group) {
      throw new TransactionFailedException("Admin must belong to a group.");
    }

    const group = this.group;
    const totalAmount = amountPerUser * group.users.length;

    if (this.balance < totalAmount) {
      throw new TransactionFailedException(
        `Insufficient coins: Required ${totalAmount}, Available ${this.balance}`
      );
    }

    this.balance -= totalAmount;
    group.users.forEach((user) => user.addCoins(amountPerUser));

    console.log(
      `${this.name} distributed ${amountPerUser} coins to each user in group "${group.name}".`
    );
  }
}

class Group {
  id: number;
  name: string;
  admin: Admin;
  users: User[];

  constructor(id: number, name: string, admin: Admin) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.users = [];
    this.addUser(admin);
  }

  addUser(user: User) {
    user.group = this;
    this.users.push(user);
  }

  getUserCount(): number {
    return this.users.length;
  }
}

try {
  const admin1 = new Admin(1, "Admin1", 200);
  const group1 = new Group(1, "VIP Customers", admin1);

  const ramesh = new User(101, "Ramesh");
  const suresh = new User(102, "Suresh");
  group1.addUser(ramesh);
  group1.addUser(suresh);

  admin1.distributeCoins(5);

  console.log("Balances after admin distrubution:");
  console.log("Admin balance:", admin1.balance);
  console.log("Suresh balance:", suresh.balance);
  console.log("Ramesh balance:", ramesh.balance);

  ramesh.pay(suresh, 2);

  console.log("Balances after ramesh pays suresh:");
  console.log("Ramesh balance:", ramesh.balance);
  console.log("Suresh balance:", suresh.balance);

  const admin2 = new Admin(2, "Admin-Group2", 100);
  const group2 = new Group(2, "Regular Customers", admin2);

  const mohan = new User(201, "mohan");
  group2.addUser(mohan);

  ramesh.pay(mohan, 10);
} catch (error) {
  if (error instanceof TransactionFailedException) {
    console.error("Transaction failed Error:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}
