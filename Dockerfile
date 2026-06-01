# Multi-stage Docker build for the Hip Recovery Spring Boot application
# Stage 1: Build the application using Maven and OpenJDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set working directory
WORKDIR /app

# Copy the pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Package the application, skipping tests for faster build
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime image using a slim OpenJDK JRE 21
FROM eclipse-temurin:21-jre-alpine

# Set working directory for the runtime container
WORKDIR /app

# Add a non‑root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Cấp quyền sở hữu thư mục app cho appuser trước khi chuyển đổi user
RUN chown -R appuser:appgroup /app

# Chuyển sang sử dụng user bảo mật
USER appuser

# Expose the default Spring Boot port
EXPOSE 8080

# Entry point to run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
