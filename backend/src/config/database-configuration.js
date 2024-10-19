const mongoose = require("mongoose");
const path = require("path");

const configDatabase = async (app) => {
	try {
		/**
		 * NOTE about the `strict` option: Mongoose will ensure that only the fields specified in the schema
		 * will be saved in the database, and all other fields will not be saved.
		 */
		mongoose.set("strictQuery", false);
		await mongoose.connect(process.env["DATABASE_CONNECTION"], {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			...(process.env["MONGO_SSL_MODE"] === "true"
				? {
						tls: true,
						tlsAllowInvalidCertificates: false, // by default, Mongoose validates the TLS certificate against a CA to ensure the TLS is valid
						tlsCAFile: path.resolve(
							__dirname,
							"../../.mongo_ssl/ca.pem"
						),
						tlsCertificateKeyFile: path.resolve(
							__dirname,
							"../../.mongo_ssl/server.pem"
						),
				  }
				: {}),
		});
		console.log("Database connected successfully!");
	} catch (error) {
		console.log("It has an error from MongoDB client");
		console.error(error);
		process.exit(1);
	}
};

module.exports = configDatabase;
