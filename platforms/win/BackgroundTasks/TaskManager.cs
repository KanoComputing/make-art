/**
 * TaskManager.cs
 *
 * This class is a project helper to register and unregister background tasks.
 */


using System;
using System.Diagnostics;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Windows.ApplicationModel.Background;
using Windows.Foundation;


namespace MakeArt.BackgroundTasks {
    public sealed class TaskManager {

        /**
         * Identifiers for the registered background tasks.
         * Find these in the EventViewer > Applications and Services Logs
         *                               > Microsoft
         *                               > Windows
         *                               > BackgroudTaskInfrastructure
         */

        // Identifiers for the CheckStoreUpdatesTask.
        public static string CheckStoreUpdatesApp {
            get { return "Check Store updates for Make Art (app)"; }
        }
        public static string CheckStoreUpdatesSession {
            get { return "Check Store updates for Make Art (session)"; }
        }
        public static string CheckStoreUpdatesEntry {
            get { return "MakeArt.BackgroundTasks.CheckStoreUpdatesTask"; }
        }

        public static IAsyncOperation<bool> RegisterAllBackgroundTasksAsync(bool runAppTrigger) {
            return RegisterAllBackgroundTasksAsyncHelper(runAppTrigger).AsAsyncOperation();
        }

        private static async Task<bool> RegisterAllBackgroundTasksAsyncHelper(bool runAppTrigger) {
            // Check for background registration permissions.
            var status = await BackgroundExecutionManager.RequestAccessAsync();
            Debug.WriteLine("BackgroundExecutionManager.RequestAccessAsync returned status " + status);
            if (status == BackgroundAccessStatus.DeniedBySystemPolicy ||
                status == BackgroundAccessStatus.DeniedByUser) {
                Debug.WriteLine("Cannot register background tasks. TODO: Notify user?");
                return false;
            }

            // TODO: Remove this after development
            //UnregisterAllBackgroundTasks();

            // Background task parameters.
            ApplicationTrigger appTrigger = new ApplicationTrigger();
            SystemTrigger sessionConnectedTrigger = new SystemTrigger(SystemTriggerType.SessionConnected, false);
            SystemCondition userPresentCondition = new SystemCondition(SystemConditionType.UserPresent);
            SystemCondition internetCondition = new SystemCondition(SystemConditionType.InternetAvailable);

            /**
             * App store update task registration
             */

            // Trigger the task to run when the app launches.
            _ = RegisterBackgroundTask(
                CheckStoreUpdatesApp, CheckStoreUpdatesEntry,
                appTrigger,
                new[] { internetCondition }
            );
            // Trigger the task to run when the user logs in, i.e. startup, logon.
            _ = RegisterBackgroundTask(
                CheckStoreUpdatesSession, CheckStoreUpdatesEntry,
                sessionConnectedTrigger,
                new[] { userPresentCondition, internetCondition }
            );

            // Run background tasks that should start when the app is launched.
            if (runAppTrigger) {
                ApplicationTriggerResult result = await appTrigger.RequestAsync();
                Debug.WriteLine("ApplicationTrigger result is" + result);
            }

            return true;
        }

        /// <summary>
        /// Register a background task with the specified name, entry, trigger, and condition (optional).
        /// </summary>
        /// <param name="taskName">Name of the background tasks by which it is identified.</param>
        /// <param name="taskEntryPoint">The class entry point prefixed by it's namespace.</param>
        /// <param name="trigger">The background trigger which will start the background task.</param>
        /// <param name="conditions">Specific conditions required for the background task to work.</param>
        public static BackgroundTaskRegistration RegisterBackgroundTask(string taskName, string taskEntryPoint, IBackgroundTrigger trigger, [ReadOnlyArray] IBackgroundCondition[] conditions) {
            // Check for existing registrations of this background task.
            foreach (var task in BackgroundTaskRegistration.AllTasks) {
                if (task.Value.Name == taskName) {
                    Debug.WriteLine("Task " + taskName + " is already registered");
                    return (BackgroundTaskRegistration)(task.Value);
                }
            }

            // Register the background task.
            BackgroundTaskBuilder builder = new BackgroundTaskBuilder {
                Name = taskName
            };

            // In-process background tasks don't set TaskEntryPoint.
            if (taskEntryPoint != null && taskEntryPoint != String.Empty) {
                builder.TaskEntryPoint = taskEntryPoint;
            }
            builder.SetTrigger(trigger);
            if (conditions != null) {
                foreach (var condition in conditions) {
                    builder.AddCondition(condition);
                }
            }

            try {
                BackgroundTaskRegistration task = builder.Register();
                //task.Completed += new BackgroundTaskCompletedEventHandler(OnBackgroundTaskCompleted);
                if (task != null) {
                    Debug.WriteLine("Registered background task " + taskName);
                } else {
                    Debug.WriteLine("Failed to register background task " + taskName);
                }
                return task;
            } catch (Exception e) {
                Debug.WriteLine("Failed to register background task, err: " + e);
                // TODO: Handle failures
                return null;
            }
        }

        public static void UnregisterAllBackgroundTasks() {
            foreach (var task in BackgroundTaskRegistration.AllTasks) {
                if (task.Value.Name == CheckStoreUpdatesApp ||
                    task.Value.Name == CheckStoreUpdatesSession) {

                    task.Value.Unregister(true);
                    Debug.WriteLine("Unregistered background task " + task.Value.Name);
                }
            }
        }
    }
}
