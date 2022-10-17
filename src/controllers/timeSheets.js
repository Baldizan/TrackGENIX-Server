import timeSheets from '../models/TimeSheets';

const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheet = await timeSheets.find();

    return res(200).json({
      message: 'Time Sheet found',
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

const getTimeSheetsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await timeSheets.findById(id);

    return res.status(200).json({
      message: `Timesheet with id ${id} found`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

const createTimeSheets = async (req, res) => {
  try {
    const timeSheet = new timeSheets({
      description: req.body.description,
      date: req.body.date,
      task: req.body.task,
    });

    const result = await timeSheet.save();
    return res.status(201).json({
      message: 'Timesheet created succesfully',
      default: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      error,
    });
  }
};

const deleteTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await timeSheets.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Timesheet with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

const editTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await timeSheets.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `Timesheet with id ${id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

export default {
  getAllTimeSheets,
  getTimeSheetsbyId,
  createTimeSheets,
  deleteTimeSheet,
  editTimeSheet,
};
