import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

const chatLimiter = new RateLimiterMemory({
  points: 10, // total req can send
  duration: 60, //reset in
});

export async function checkRateLimit(userId: string) {
  try {
    await chatLimiter.consume(userId, 1);

    return {
      success: true,
      status: 200,
    };
  } catch (error: unknown) {
    const rateLimitRes = error as RateLimiterRes;
    return {
      success: false,
      status: 429,
      error: `Too many requests. Try again in ${Math.ceil(
        rateLimitRes.msBeforeNext / 1000,
      )} seconds.`,
    };
  }
}
