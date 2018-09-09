package api

import (
	"os"
	"log"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func S3Upload(key string, file_path string) (err error) {
	bucket_name := os.Getenv("AWS_BUCKET")

	log.Println("Uploading " + key + " to bucket " + bucket_name)

	file, ferr := os.Open(file_path)
	if ferr != nil {
		log.Fatal("Failed to open file: ", ferr)
		return
	}
	defer file.Close()

	svc := s3.New(session.New())
	input := &s3.PutObjectInput{
		Body:   file,
		Bucket: aws.String(bucket_name),
		Key:    aws.String(key),
	}

	result, err := svc.PutObject(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			default:
				log.Fatal("error in s3 put object: ", aerr)
			}
		} else {
			// Print the error, cast err to awserr.Error to get the Code and
			// Message from an error.
			log.Fatal("error in s3 put object (2): ", err)
		}
		return
	}

	log.Println(result)
	return
}
