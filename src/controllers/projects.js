import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    return res.status(200).json({
      message: 'Project found.',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error.',
      error,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Projects.findById(id);
    return res.status(200).json({
      message: `Project ${req.params.id} found.`,
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error.',
      error,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
};
