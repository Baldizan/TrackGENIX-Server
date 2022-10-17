import Projects from '../models/Projects';

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndDelete(id);

    return res.status(204).json({
      message: `Project with id ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Error! project not found',
      error,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    return res.status(200).json({
      message: `Project with id ${id} updated.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Error. Cannot updated',
      error,
    });
  }
};

export default {
  deleteProject,
  updateProject,
};
