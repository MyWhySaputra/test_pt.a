const User = require("../models/UserModel");
const Tiket = require("../models/TicketModel");
const WorkOrder = require("../models/WorkOrderModel");
const { ResponseTemplate } = require("../helpers/template.helper");
const {
  ComparePassword,
  HashPassword,
} = require("../helpers/hash_pass_helper");
var jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { name, username, password } = req.body;
  const hashPassword = await HashPassword(password);
  try {
    const response = await User.create({
      name: name,
      username: username,
      password: hashPassword,
    });

    const view = await User.findOne({
      attributes: ["name", "username"],
      where: {
        id: response.id,
      },
    });
    res
      .status(201)
      .json(ResponseTemplate(view, "Success, user created", null, 201));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    const checkPassword = await ComparePassword(password, user.password);

    if (!checkPassword) {
      let resp = ResponseTemplate(null, "password is not correct", null, 400);
      res.status(400).json(resp);
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      "RAHASIA",
      { expiresIn: "1h" }
    );

    const data = {
      token: token,
    };

    let resp = ResponseTemplate(data, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function createTicket(req, res) {
  const { title, description } = req.body;
  try {
    const response = await Tiket.create({
      title: title,
      description: description,
      status: "OPEN",
      user_id: req.user.id,
    });
    res.status(201).json(ResponseTemplate(response, "Success", null, 201));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function createWorkOrder(req, res) {
  const { ticket_id, technician_name, technician_email } = req.body;
  try {
    const checkTicket = await Tiket.findOne({
      where: {
        id: Number(ticket_id),
      },
    });

    if (!checkTicket) {
      let resp = ResponseTemplate(null, "ticket not found", null, 400);
      res.status(400).json(resp);
      return;
    }

    await Tiket.update(
      {
        status: "SUBMITTED",
      },
      {
        where: {
          id: checkTicket.id,
        },
      }
    );

    const response = await WorkOrder.create({
      tiket_id: checkTicket.id,
      status: "OPEN",
      technician_name: technician_name,
      technician_email: technician_email,
    });
    res.status(201).json(ResponseTemplate(response, "Success", null, 201));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function sendNot(req, res) {
  const { workOrder_id } = req.body;
  try {
    const checkWorkOrder = await WorkOrder.findOne({
      where: {
        id: Number(workOrder_id),
      },
    });

    if (!checkWorkOrder) {
      let resp = ResponseTemplate(null, "WorkOrder not found", null, 400);
      res.status(400).json(resp);
      return;
    }

    res
      .status(201)
      .json(
        ResponseTemplate(
          checkWorkOrder,
          `Success, Pesan Terkirim ke email ${checkWorkOrder.technician_email}`,
          null,
          201
        )
      );
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function AcceptWO(req, res) {
  const { workOrder_id } = req.body;
  try {
    const checkWorkOrder = await WorkOrder.findOne({
      where: {
        id: Number(workOrder_id),
      },
    });

    if (!checkWorkOrder) {
      let resp = ResponseTemplate(null, "WorkOrder not found", null, 400);
      res.status(400).json(resp);
      return;
    }

    await Tiket.update(
      {
        status: "ON PROGRESS",
      },
      {
        where: {
          id: checkWorkOrder.tiket_id,
        },
      }
    );

    await WorkOrder.update(
      {
        status: "ON PROGRESS",
      },
      {
        where: {
          id: checkWorkOrder.id,
        },
      }
    );

    const response = await WorkOrder.findOne({
      where: {
        id: checkWorkOrder.id,
      }
    })

    res.status(201).json(ResponseTemplate(response, "Success", null, 201));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function DoneWO(req, res) {
  const { workOrder_id } = req.body;
  try {
    const checkWorkOrder = await WorkOrder.findOne({
      where: {
        id: Number(workOrder_id),
      },
    });

    if (!checkWorkOrder) {
      let resp = ResponseTemplate(null, "WorkOrder not found", null, 400);
      res.status(400).json(resp);
      return;
    }

    await WorkOrder.update(
      {
        status: "DONE",
      },
      {
        where: {
          id: checkWorkOrder.id,
        },
      }
    );

    const response = await WorkOrder.findOne({
      where: {
        id: checkWorkOrder.id,
      }
    })

    res.status(201).json(ResponseTemplate(response, "Success", null, 201));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function DoneTicket(req, res) {
  const { ticket_id } = req.body;
  try {
    const checkTicket = await Tiket.findOne({
      where: {
        id: Number(ticket_id),
      },
    });

    if (!checkTicket) {
      let resp = ResponseTemplate(null, "ticket not found", null, 400);
      res.status(400).json(resp);
      return;
    }

    await Tiket.update(
      {
        status: "DONE",
      },
      {
        where: {
          id: checkTicket.id,
        },
      }
    );

    const response = await Tiket.findOne({
      where: {
        id: checkTicket.id,
      }
    })

    res.status(201).json(ResponseTemplate(response, "Success", null, 201));
  } catch (error) {
    res
      .status(400)
      .json(ResponseTemplate(null, "internal server error", error, 500));
  }
}

async function getTicket(req, res) {
  try {
    const response = await Tiket.findAll({});
    res.status(200).json(ResponseTemplate(response, "Success", null, 200));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function getWorkOrder(req, res) {
  try {
    const response = await WorkOrder.findAll({});
    res.status(200).json(ResponseTemplate(response, "Success", null, 200));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  createUser,
  login,
  createTicket,
  createWorkOrder,
  sendNot,
  AcceptWO,
  DoneWO,
  DoneTicket,
  getTicket,
  getWorkOrder,
};
