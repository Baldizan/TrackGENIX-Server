import Employees from '../models/Employees';

const deleteEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Employee with id ${id} deleted`,
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

const updateEmployees = async () => {

};

export {
  deleteEmployees,
  updateEmployees,
};
