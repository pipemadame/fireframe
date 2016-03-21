var mongoose = require('mongoose');
var Wireframe = mongoose.model('Wireframe');

var ProjectSchema = new mongoose.Schema({

	name: {
		type:String,
		required:true
	},
	team: {
		type:mongoose.Schema.Types.ObjectId, 
		ref:'Team',
		required:true
	},
	type: String

});

ProjectSchema.methods.deleteProject = function() {
	var project = this;

	Wireframe.find({
		project: project._id
	})
	.then(wireframes => {
		var deletions = [];

		wireframes.forEach(function(wireframe) {
			deletions.push(wireframe.deleteWithComponents())
		})

		return Promise.all(deletions);
	})
	.then(() => {
		return project.remove();
	});
}

module.exports = ('Project', ProjectSchema);