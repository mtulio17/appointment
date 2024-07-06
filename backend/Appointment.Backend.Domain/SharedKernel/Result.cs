using System.Diagnostics.CodeAnalysis;

namespace Appointment.Backend.Domain.SharedKernel;

public class Result
{
    public Result(bool isSuccess, Error error)
    {
        if (isSuccess && error != Error.None ||
            !isSuccess && error == Error.None)
        {
            throw new ArgumentException("Invalid error", nameof(error));
        }

        IsSuccess = isSuccess;
        Error = error;
    }

    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public Error Error { get; }

    public static Result Success() => new(true, Error.None);

    public static Result Failure(Error error) => new(false, error);

    public static Result<TValue> Success<TValue>(TValue value) => new(value, true, Error.None);

    public static Result<TValue> Failure<TValue>(Error error) => new(default, false, error);

    internal static Result Failure(object invitationErrors)
    {
        throw new NotImplementedException();
    }
}

public class Result<TValue> : Result
{
    private readonly TValue? _value;

    public Result(TValue? value, bool isSuccess, Error error)
        : base(isSuccess, error)
    {
        _value = value;
    }

    [NotNull]
    public TValue Value => IsSuccess
        ? _value!
        : throw new InvalidOperationException("The value of a failure result can't be accessed.");

    public static implicit operator Result<TValue>(TValue? value) =>
        value is not null ? Success(value) : Failure<TValue>(Error.NullValue);

    public static Result<TValue> ValidationFailure(Error error) =>
        new(default, false, error);
}

// Resources:
// Result pattern AKA Railway pattern.
// Functional error handling in .NET with the Result Pattern by Milan Jovanovic.
// https://www.milanjovanovic.tech/blog/functional-error-handling-in-dotnet-with-the-result-pattern
// Error Handling in .NET Using the Result Pattern: Mastering Robust Application Development by Salman Karim
// https://medium.com/@iamsalmankarim/error-handling-in-net-using-the-result-pattern-mastering-robust-application-development-8b9b858aa25f
// Using Result Classes, Matthew Edgar
// https://edgamat.com/2021/01/18/Using-Result-Classes.html
// Error handling: Exception or Result? by Vladimir Khorikov, Enterprise Craftsmanship:
// https://enterprisecraftsmanship.com/posts/error-handling-exception-or-result/
// Exceptions and flows:
// Flow control, Amichai Martinband:
// https://www.youtube.com/watch?v=tZ8gGqiq_IU&t=1267s
// What is an Excepcional situation by Vladimir Khorikov, Enterprise Craftsmanship:
// https://enterprisecraftsmanship.com/posts/what-is-exceptional-situation/
// Exceptions for flow control in C# by Vladimir Khorikov, Enterprise Craftsmanship:
// https://enterprisecraftsmanship.com/posts/exceptions-for-flow-control/
