const express = require("express");
const {
  // createUser,
  login,
  createTicket,
  createWorkOrder,
  sendNot,
  AcceptWO,
  DoneWO,
  DoneTicket,
  getTicket,
  getWorkOrder,
} = require("../../controllers/UsersController");

const { Auth } = require("../../middleware/middleware");

const router = express.Router();

// router.post("/users", createUser);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Login
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);
/**
 * @swagger
 * /api/v1/tickets:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Create Ticket
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/tickets", Auth, createTicket);
/**
 * @swagger
 * /api/v1/workorders:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Create Work Order
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ticket_id:
 *                  type: integer
 *                technician_name:
 *                  type: string
 *                technician_email:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/workorders", Auth, createWorkOrder);
/**
 * @swagger
 * /api/v1/sendnot:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Send Notification
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                workOrder_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/sendnot", sendNot);
/**
 * @swagger
 * /api/v1/AcceptWO:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Accept Work Order
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                workOrder_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/AcceptWO", Auth, AcceptWO);
/**
 * @swagger
 * /api/v1/DoneWO:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Done Work Order
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                workOrder_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/DoneWO", Auth, DoneWO);
/**
 * @swagger
 * /api/v1/DoneTicket:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Done Ticket
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ticket_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/DoneTicket", Auth, DoneTicket);
/**
 * @swagger
 * /api/v1/tickets:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Get Ticket
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.get("/tickets", Auth, getTicket);
/**
 * @swagger
 * /api/v1/workorders:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Get Work Order
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.get("/workorders", Auth, getWorkOrder);

module.exports = router;
