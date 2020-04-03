export default abstract class StatusCodeError extends Error {
    public abstract statusCode: number;
    public abstract message: string;
}
