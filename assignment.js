var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TransactionFailedException = /** @class */ (function (_super) {
    __extends(TransactionFailedException, _super);
    function TransactionFailedException(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "TransactionFailedException Message";
        return _this;
    }
    return TransactionFailedException;
}(Error));
var User = /** @class */ (function () {
    function User(id, name, balance) {
        if (balance === void 0) { balance = 0; }
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.group = null;
    }
    User.prototype.addCoins = function (amount) {
        this.balance += amount;
    };
    User.prototype.pay = function (toUser, amount) {
        if (!this.group || !toUser.group) {
            throw new TransactionFailedException("Both users must belong to a group.");
        }
        if (this.group.id !== toUser.group.id) {
            throw new TransactionFailedException("Payment failed: ".concat(this.name, " and ").concat(toUser.name, " are not in the same group."));
        }
        //Because user can not send coins to group admin as we have talked about
        if (toUser === this.group.admin) {
            throw new TransactionFailedException("Payment failed: ".concat(this.name, " cannot send coins to the group admin (").concat(toUser.name, ")."));
        }
        if (this.balance < amount) {
            throw new TransactionFailedException("Payment failed: ".concat(this.name, " has insufficient balance."));
        }
        this.balance -= amount;
        toUser.balance += amount;
        console.log("".concat(this.name, " paid ").concat(amount, " coins to ").concat(toUser.name, "."));
    };
    return User;
}());
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(id, name, balance) {
        if (balance === void 0) { balance = 0; }
        return _super.call(this, id, name, balance) || this;
    }
    Admin.prototype.distributeCoins = function (amountPerUser) {
        if (!this.group) {
            throw new TransactionFailedException("Admin must belong to a group.");
        }
        var group = this.group;
        var totalAmount = amountPerUser * group.users.length;
        if (this.balance < totalAmount) {
            throw new TransactionFailedException("Insufficient coins: Required ".concat(totalAmount, ", Available ").concat(this.balance));
        }
        this.balance -= totalAmount;
        group.users.forEach(function (user) { return user.addCoins(amountPerUser); });
        console.log("".concat(this.name, " distributed ").concat(amountPerUser, " coins to each user in group \"").concat(group.name, "\"."));
    };
    return Admin;
}(User));
var Group = /** @class */ (function () {
    function Group(id, name, admin) {
        this.id = id;
        this.name = name;
        this.admin = admin;
        this.users = [];
        this.addUser(admin);
    }
    Group.prototype.addUser = function (user) {
        user.group = this;
        this.users.push(user);
    };
    Group.prototype.getUserCount = function () {
        return this.users.length;
    };
    return Group;
}());
try {
    var admin1 = new Admin(1, "Admin1", 200);
    var group1 = new Group(1, "VIP Customers", admin1);
    var ramesh = new User(101, "Ramesh");
    var suresh = new User(102, "Suresh");
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
    var admin2 = new Admin(2, "Admin-Group2", 100);
    var group2 = new Group(2, "Regular Customers", admin2);
    var mohan = new User(201, "mohan");
    group2.addUser(mohan);
    ramesh.pay(mohan, 10);
}
catch (error) {
    if (error instanceof TransactionFailedException) {
        console.error("Transaction failed Error:", error.message);
    }
    else {
        console.error("Unexpected error:", error);
    }
}
